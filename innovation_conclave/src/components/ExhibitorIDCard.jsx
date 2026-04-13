// src/components/ExhibitorIDCard.jsx
// ID Card — 89mm × 124mm
// Design: White card, orange accents, large centered circle photo,
//         diagonal stripe decoration, barcode at bottom (matches reference)
import { useCallback } from 'react';
import { jsPDF } from 'jspdf';
import { Download } from 'lucide-react';

const API_BASE = 'http://localhost:4000';
const W = 89;
const H = 124;

const ORANGE = [255, 107, 26];      // #FF6B1A
const BLACK = [20, 20, 20];        // near black
const DARK = [28, 28, 36];        // dark bg for ID bar
const GRAY = [120, 120, 135];     // subtitle gray
const LGRAY = [240, 240, 245];     // light circle bg

// Load image from URL and pre-clip it to a circle on a canvas.
// jsPDF cannot clip images to shapes, so we do it here before adding to PDF.
function loadImageAsCircle(url, sizePx = 300) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = sizePx;
      canvas.height = sizePx;
      const ctx = canvas.getContext('2d');

      ctx.beginPath();
      ctx.arc(sizePx / 2, sizePx / 2, sizePx / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();

      const scale = Math.max(sizePx / img.naturalWidth, sizePx / img.naturalHeight);
      const drawW = img.naturalWidth * scale;
      const drawH = img.naturalHeight * scale;
      const offsetX = (sizePx - drawW) / 2;
      const offsetY = 0; // align to top

      ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = () => resolve(null);
    img.src = url;
  });
}

function getInitials(name = '') {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().substring(0, 2);
}

// ── TECH MESH HELPERS ────────────────────────────────────────────────────────
function getMeshNodes(cols, rows, wMM, hMM) {
  const nodes = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const jx = ((c * 31 + r * 17 + 7) % 13) / 13 - 0.5;
      const jy = ((r * 29 + c * 11 + 3) % 11) / 11 - 0.5;
      const x = (c / (cols - 1)) * wMM + jx * (wMM / cols) * 0.9;
      const y = (r / (rows - 1)) * hMM + jy * (hMM / rows) * 0.9;
      nodes.push({ x: Math.max(1, Math.min(wMM - 1, x)), y: Math.max(1, Math.min(hMM - 1, y)) });
    }
  }
  return nodes;
}

function drawMeshPDF(pdf, wMM, hMM) {
  const nodes = getMeshNodes(10, 14, wMM, hMM);
  const threshold = 18;
  pdf.setDrawColor(210, 215, 230);
  pdf.setLineWidth(0.15);
  pdf.setGState(new pdf.GState({ opacity: 0.6 }));
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      if (Math.sqrt(dx * dx + dy * dy) < threshold) {
        pdf.line(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
      }
    }
  }
  pdf.setGState(new pdf.GState({ opacity: 0.7 }));
  nodes.forEach((n, i) => {
    const r = i % 5 === 0 ? 0.7 : i % 3 === 0 ? 0.5 : 0.3;
    pdf.setFillColor(i % 5 === 0 ? 255 : 200, i % 5 === 0 ? 107 : 215, i % 5 === 0 ? 26 : 230);
    pdf.circle(n.x, n.y, r, 'F');
  });
  pdf.setGState(new pdf.GState({ opacity: 1 }));
}

function getMeshSVG(w, h) {
  const nodes = getMeshNodes(10, 14, w, h);
  const threshold = h * 0.145;
  let svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'>`;
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      if (Math.sqrt(dx * dx + dy * dy) < threshold) {
        svg += `<line x1='${nodes[i].x.toFixed(1)}' y1='${nodes[i].y.toFixed(1)}' x2='${nodes[j].x.toFixed(1)}' y2='${nodes[j].y.toFixed(1)}' stroke='%23d0d5e8' stroke-width='0.5' opacity='0.6'/>`;
      }
    }
  }
  nodes.forEach((n, i) => {
    const r = i % 5 === 0 ? 2.2 : i % 3 === 0 ? 1.5 : 1;
    const fill = i % 5 === 0 ? '%23FF6B1A' : '%23c8d0e8';
    const op = i % 5 === 0 ? 0.55 : 0.5;
    svg += `<circle cx='${n.x.toFixed(1)}' cy='${n.y.toFixed(1)}' r='${r}' fill='${fill}' opacity='${op}'/>`;
  });
  svg += '</svg>';
  return `url("data:image/svg+xml,${svg}")`;
}

// Fetch QR Code as data URL
function fetchQRCode(data, size = 150) {
  return new Promise((resolve) => {
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(data)}`;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = () => resolve(null);
    img.src = url;
  });
}


export default function ExhibitorIDCard({ member, exhibitor, compact = false }) {
  const cardId = `IC2026-EX-${String(exhibitor.id).padStart(3, '0')}-${String(member.id).padStart(3, '0')}`;
  const photoUrl = member.photo ? `${API_BASE}/uploads/exhibitors/${member.photo}` : null;

  const downloadPDF = useCallback(async () => {
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: [W, H] });

    // 1. Background + Mesh
    pdf.setFillColor(255, 255, 255);
    pdf.rect(0, 0, W, H, 'F');
    drawMeshPDF(pdf, W, H);

    // 2. Wavy Background Line (Visual Decoration from sketch)
    pdf.setDrawColor(...ORANGE);
    pdf.setLineWidth(0.3);
    pdf.setGState(new pdf.GState({ opacity: 0.4 }));
    // Draw waves using relative cubic bezier paths: [[cp1x, cp1y, cp2x, cp2y, endX, endY]]
    pdf.lines([[W / 2, 20, W / 2, -20, W, 0]], 0, 45, [1, 1], 'S');
    pdf.lines([[W / 2, 20, W / 2, -20, W, 0]], 0, 85, [1, 1], 'S');
    pdf.setGState(new pdf.GState({ opacity: 1 }));


    // ── HEADER ACCENTS ───────────────────────────────────────
    // Top-left grid
    pdf.setFillColor(...ORANGE);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        pdf.rect(3 + i * 2, 3 + j * 2, 1, 1, 'F');
      }
    }
    // Top-right mesh arc
    pdf.setDrawColor(...ORANGE);
    pdf.circle(W + 8, -8, 25, 'S');
    pdf.setDrawColor(...BLACK);
    pdf.circle(W + 8, -8, 22, 'S');

    // ── BRANDING ──────────────────────────────────────────────
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.setTextColor(...BLACK);
    pdf.text('INNOVATION', W / 2, 10, { align: 'center' });
    pdf.text('CONCLAVE', W / 2, 15, { align: 'center' });
    pdf.setFillColor(...ORANGE);
    pdf.rect(W / 2 - 12, 17, 24, 0.5, 'F');

    // ── PHOTO ────────────────────────────────────────────────
    const photoD = 30;
    const photoR = photoD / 2;
    const photoCX = W / 2;
    const photoCY = 34;
    pdf.setFillColor(...LGRAY);
    pdf.circle(photoCX, photoCY, photoR + 0.8, 'F');

    if (photoUrl) {
      try {
        const imgData = await loadImageAsCircle(photoUrl, 300);
        if (imgData) pdf.addImage(imgData, 'PNG', photoCX - photoR, photoCY - photoR, photoD, photoD);
        else drawInitialsCircle(pdf, photoCX, photoCY, photoR, member.name);
      } catch {
        drawInitialsCircle(pdf, photoCX, photoCY, photoR, member.name);
      }
    } else {
      drawInitialsCircle(pdf, photoCX, photoCY, photoR, member.name);
    }
    pdf.setDrawColor(...ORANGE);
    pdf.setLineWidth(0.8);
    pdf.circle(photoCX, photoCY, photoR + 0.2, 'S');

    // ── NAME ──────────────────────────────────────────────────
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(13);
    pdf.setTextColor(...BLACK);
    pdf.text(member.name.toUpperCase(), W / 2, photoCY + photoR + 8, { align: 'center' });

    // ── 2x2 GRID INFORMATION LAYOUT ──────────────────────────
    const gridY = photoCY + photoR + 14;
    const boxW = (W - 16) / 2 - 2;
    const boxH = 16;

    // BOX 1: Organization (Top Left)
    pdf.setFillColor(255, 255, 255);
    pdf.setDrawColor(230, 230, 235);
    pdf.roundedRect(8, gridY, boxW, boxH, 1.5, 1.5, 'FD');
    pdf.setFontSize(4.5);
    pdf.setTextColor(...GRAY);
    pdf.text('ORGANIZATION', 10, gridY + 5);
    pdf.setFontSize(7.5);
    pdf.setTextColor(...BLACK);
    const org = exhibitor.org_name.length > 20 ? exhibitor.org_name.substring(0, 18) + '...' : exhibitor.org_name;
    pdf.text(org, 10, gridY + 10);

    // BOX 2: Role (Top Right)
    pdf.setFillColor(255, 255, 255);
    pdf.setDrawColor(230, 230, 235);
    pdf.roundedRect(W / 2 + 2, gridY, boxW, boxH, 1.5, 1.5, 'FD');
    pdf.setFontSize(4.5);
    pdf.setTextColor(...GRAY);
    pdf.text('ROLE', W / 2 + 4, gridY + 5);
    pdf.setFontSize(8.5);
    pdf.setTextColor(...BLACK);
    pdf.text(member.role, W / 2 + 4, gridY + 10);

    // BOX 3: ID Number (Bottom Left)
    pdf.setFillColor(255, 255, 255);
    pdf.setDrawColor(230, 230, 235);
    pdf.roundedRect(8, gridY + boxH + 4, boxW, boxH, 1.5, 1.5, 'FD');
    pdf.setFontSize(4.5);
    pdf.setTextColor(...GRAY);
    pdf.text('MEMBER ID', 10, gridY + boxH + 9);
    pdf.setFontSize(7.5);
    pdf.setTextColor(...BLACK);
    pdf.text(cardId, 10, gridY + boxH + 14);

    // BOX 4: QR Code (Bottom Right)
    pdf.setFillColor(255, 255, 255);
    pdf.setDrawColor(230, 230, 235);
    pdf.roundedRect(W / 2 + 2, gridY + boxH + 4, boxW, boxH, 1.5, 1.5, 'FD');

    const qrDataUrl = await fetchQRCode(cardId, 150);
    if (qrDataUrl) {
      pdf.addImage(qrDataUrl, 'PNG', W / 2 + 8, gridY + boxH + 5, boxH - 2, boxH - 2);
    }

    // ── FOOTER ────────────────────────────────────────────────
    pdf.setFillColor(...DARK);
    pdf.rect(0, H - 10, W, 10, 'F');
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(4);
    pdf.setTextColor(255, 255, 255);
    pdf.text('INNOVATION CONCLAVE 2026 · EXHIBITOR PASS', W / 2, H - 4.5, { align: 'center' });

    pdf.save(`${cardId}_IDCard.pdf`);
  }, [member, exhibitor, cardId, photoUrl]);

  const initials = getInitials(member.name);

  if (compact) {
    return (
      <button
        onClick={downloadPDF}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-white text-[11px] font-bold transition-all hover:scale-105 active:scale-95"
        style={{ background: '#FF6B1A' }}
      >
        <Download className="w-3 h-3" /> ID Card
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div
        style={{
          width: 252, aspectRatio: '89/124',
          boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
          borderRadius: 16, overflow: 'hidden', margin: '0 auto',
        }}
      >
        <div
          className="w-full h-full relative flex flex-col"
          style={{
            background: '#ffffff',
            backgroundImage: getMeshSVG(252, 351),
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 100%',
            fontFamily: 'Inter, system-ui, sans-serif',
          }}
        >
          {/* 1. Wavy Background (from sketch) */}
          <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.15 }}>
            <path d="M0 140 Q 126 180, 252 140" stroke="#FF6B1A" strokeWidth="2" fill="none" />
            <path d="M0 260 Q 126 300, 252 260" stroke="#FF6B1A" strokeWidth="2" fill="none" />
          </svg>

          {/* 2. Header Accents (from sketch) */}
          <div className="absolute top-4 left-4 grid grid-cols-3 gap-1 opacity-40">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => <div key={i} className="w-1.5 h-1.5 bg-[#FF6B1A]" />)}
          </div>
          <div className="absolute top-[-20px] right-[-20px] w-40 h-40 opacity-20 border-r-4 border-t-4 border-[#FF6B1A] rounded-tr-full"
            style={{ backgroundImage: 'radial-gradient(circle, #FF6B1A 1px, transparent 1px)', backgroundSize: '6px 6px' }} />

          {/* 3. Branding (Smaller/Centered) */}
          <div className="relative z-10 flex flex-col items-center pt-[5%]">
            <p className="font-black tracking-widest uppercase text-[#1a1a24] text-[10px] leading-tight">INNOVATION</p>
            <p className="font-black tracking-widest uppercase text-[#1a1a24] text-[10px] leading-tight">CONCLAVE</p>
            <div style={{ width: 50, height: 1.5, background: '#FF6B1A', marginTop: 3 }} />
          </div>

          {/* 4. Photo (Smaller/Centered) */}
          <div className="relative z-10 flex justify-center mt-3">
            <div style={{ position: 'relative', width: 70, height: 70 }}>
              <div style={{ position: 'absolute', inset: -4, borderRadius: '50%', background: '#f0f0f5', zIndex: 0 }} />
              <div style={{ position: 'absolute', inset: -1.5, borderRadius: '50%', border: '2px solid #FF6B1A', zIndex: 1 }} />
              <div style={{ position: 'relative', width: 70, height: 70, borderRadius: '50%', overflow: 'hidden', zIndex: 2 }}>
                {photoUrl ? (
                  <img src={photoUrl} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#FF6B1A] to-[#ff9a5c] text-white text-2xl font-black">
                    {initials}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 5. Name */}
          <div className="relative z-20 flex flex-col items-center px-4 mt-2">
            <p className="font-black text-center tracking-tight leading-tight text-[#1a1a24] text-[16px]">
              {member.name.toUpperCase()}
            </p>
          </div>

          {/* 6. 2x2 Grid Layout (from sketch) */}
          <div className="relative z-20 px-4 mt-3 grid grid-cols-2 gap-3">
            {/* Box 1: Organization */}
            <div 
              className="border border-slate-100 rounded-lg p-2 shadow-sm flex flex-col items-center"
              style={{ backgroundColor: '#ffffff' }}
            >
              <span className="text-[7px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">Organization</span>
              <span className="text-[10px] font-black text-slate-900 text-center leading-tight">{exhibitor.org_name}</span>
            </div>
            {/* Box 2: Role */}
            <div 
              className="border border-slate-100 rounded-lg p-2 shadow-sm flex flex-col items-center"
              style={{ backgroundColor: '#ffffff' }}
            >
              <span className="text-[7px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">Role</span>
              <span className="text-[11px] font-black text-slate-900 leading-tight">{member.role}</span>
            </div>
            {/* Box 3: ID */}
            <div 
              className="border border-slate-100 rounded-lg p-2 shadow-sm flex flex-col items-center overflow-hidden"
              style={{ backgroundColor: '#ffffff' }}
            >
              <span className="text-[7px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">Member ID</span>
              <span className="text-[9px] font-black font-mono text-slate-800 break-all text-center">{cardId}</span>
            </div>
            {/* Box 4: QR Code */}
            <div 
              className="border border-slate-100 rounded-lg p-1.5 shadow-sm flex items-center justify-center"
              style={{ backgroundColor: '#ffffff' }}
            >

              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${cardId}`}
                alt="QR Code"
                className="w-10 h-10"
              />
            </div>
          </div>

          <div className="flex-1" />

          {/* 7. Footer Bar (from sketch) */}
          <div className="bg-[#1c1c24] py-2.5 px-4 flex justify-center mt-auto">
            <span className="text-white text-[7px] font-bold tracking-widest opacity-80 uppercase">
              Innovation Conclave 2026 · Exhibitor Pass
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={downloadPDF}
        className="w-full py-3 rounded-xl font-bold text-white transition-all hover:scale-[1.02] active:scale-95"
        style={{ background: 'linear-gradient(135deg, #FF6B1A 0%, #ff8c42 100%)', boxShadow: '0 8px 28px rgba(255,107,26,0.4)' }}
      >
        <Download className="w-4 h-4 inline mr-2" /> Download ID Card (PDF)
      </button>
    </div>
  );
}



function drawInitialsCircle(pdf, cx, cy, r, name) {
  const initials = name.split(' ').map((n) => n[0]).join('').toUpperCase().substring(0, 2);
  pdf.setFillColor(...ORANGE);
  pdf.circle(cx, cy, r, 'F');
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(16);
  pdf.setTextColor(255, 255, 255);
  pdf.text(initials, cx, cy + 3.5, { align: 'center' });
}
