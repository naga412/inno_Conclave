// src/components/IDCardPDF.jsx
// Generates a CR80 ID-card-sized PDF (85.6mm × 54mm) using pure jsPDF drawing
import { useCallback, useRef } from 'react';
import { jsPDF } from 'jspdf';
import { FileText } from 'lucide-react';

const API_BASE = 'http://localhost:4000';

// CR80 standard ID card: 85.6mm × 54mm
const W = 85.6;
const H = 54;

function loadImageAsBase64(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = () => resolve(null);
    img.src = url;
  });
}

export default function IDCardPDF({ participant }) {
  const p = participant;
  const ticketId = `IC2026-${String(p.id).padStart(5, '0')}`;
  const photoUrl = p.photo
    ? `${API_BASE}/uploads/participants/${p.photo}`
    : null;

  const downloadPDF = useCallback(async () => {
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: [W, H],
    });

    // ── HEADER GRADIENT (blue band) ──
    // Simulate gradient with 2 color blocks
    pdf.setFillColor(37, 99, 235);  // orange-300
    pdf.rect(0, 0, W / 2, 18, 'F');
    pdf.setFillColor(79, 70, 229);  // indigo-600
    pdf.rect(W / 2, 0, W / 2, 18, 'F');

    // Decorative circle
    pdf.setFillColor(255, 255, 255);
    pdf.setGState(new pdf.GState({ opacity: 0.08 }));
    pdf.circle(W - 8, 2, 10, 'F');
    pdf.setGState(new pdf.GState({ opacity: 1 }));

    // Header text
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(5);
    pdf.setTextColor(191, 219, 254); // orange-300
    pdf.text('INNOVATION CONCLAVE 2026', 5, 5.5);

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(9);
    pdf.setTextColor(255, 255, 255);
    pdf.text('PARTICIPANT ID CARD', 5, 10.5);

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(4.5);
    pdf.setTextColor(191, 219, 254);
    pdf.text('March 28 \u2013 29  \u00b7  AITAM, Tekkali', 5, 14);

    // Ticket ID badge (right side of header)
    pdf.setFillColor(255, 255, 255);
    pdf.setGState(new pdf.GState({ opacity: 0.15 }));
    pdf.roundedRect(W - 28, 3, 24, 12, 2, 2, 'F');
    pdf.setGState(new pdf.GState({ opacity: 1 }));

    pdf.setFontSize(4);
    pdf.setTextColor(191, 219, 254);
    pdf.text('TICKET ID', W - 26, 7);

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(7);
    pdf.setTextColor(255, 255, 255);
    pdf.text(ticketId, W - 26, 12);

    // ── BODY ──
    // White background
    pdf.setFillColor(255, 255, 255);
    pdf.rect(0, 18, W, H - 18, 'F');

    // ── PHOTO ──
    const photoX = 5;
    const photoY = 18; // overlaps header slightly
    const photoSize = 15;

    // Photo border
    pdf.setFillColor(255, 255, 255);
    pdf.roundedRect(photoX - 0.8, photoY - 0.8, photoSize + 1.6, photoSize + 1.6, 2, 2, 'F');

    if (photoUrl) {
      try {
        const imgData = await loadImageAsBase64(photoUrl);
        if (imgData) {
          pdf.addImage(imgData, 'PNG', photoX, photoY, photoSize, photoSize);
        } else {
          drawInitialsBox(pdf, photoX, photoY, photoSize, p.name);
        }
      } catch {
        drawInitialsBox(pdf, photoX, photoY, photoSize, p.name);
      }
    } else {
      drawInitialsBox(pdf, photoX, photoY, photoSize, p.name);
    }

    // Mask protruding image corners with a heavy white stroke to completely prevent bleed
    pdf.setDrawColor(255, 255, 255);
    pdf.setLineWidth(2.5);
    pdf.roundedRect(photoX, photoY, photoSize, photoSize, 2, 2, 'S');

    // Photo border outline
    pdf.setDrawColor(226, 232, 240); // slate-200
    pdf.setLineWidth(0.3);
    pdf.roundedRect(photoX, photoY, photoSize, photoSize, 2, 2, 'S');

    // Verified badge under photo
    pdf.setFillColor(220, 252, 231); // green-100
    pdf.roundedRect(photoX + 1, photoY + photoSize + 2, photoSize - 2, 4, 1, 1, 'F');
    pdf.setFontSize(3.5);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(21, 128, 61); // green-700
    pdf.text('VERIFIED', photoX + photoSize / 2, photoY + photoSize + 4.8, { align: 'center' });

    // ── DETAILS (right of photo) ──
    const detailX = photoX + photoSize + 5;
    const detailY = 21;

    // Name
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(10);
    pdf.setTextColor(15, 23, 42); // slate-900
    pdf.text(p.name, detailX, detailY);

    // Department
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(5.5);
    pdf.setTextColor(100, 116, 139); // slate-500
    pdf.text(p.department || '', detailX, detailY + 4.5);

    // Detail rows
    const details = [
      ['COLLEGE', p.college],
      ['EMAIL', p.email],
      ['PHONE', p.phone],
      ['LUNCH', p.lunch ? 'Opted In' : 'Not selected'],
    ];

    let rowY = detailY + 10;
    const colW = 30;

    details.forEach(([label, value], i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = detailX + col * colW;
      const y = rowY + row * 7;

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(3.5);
      pdf.setTextColor(148, 163, 184); // slate-400
      pdf.text(label, x, y);

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(5);
      pdf.setTextColor(51, 65, 85); // slate-700
      // Truncate long values
      const truncated = value && value.length > 28 ? value.substring(0, 26) + '…' : (value || '');
      pdf.text(truncated, x, y + 3);
    });

    // ── FOOTER LINE ──
    pdf.setDrawColor(241, 245, 249); // slate-100
    pdf.setLineWidth(0.2);
    pdf.line(detailX, H - 6, W - 5, H - 6);

    // Footer left: IC logo + url
    pdf.setFillColor(37, 99, 235);
    pdf.roundedRect(detailX, H - 5.5, 3, 3, 0.5, 0.5, 'F');
    pdf.setFontSize(2.5);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(255, 255, 255);
    pdf.text('IC', detailX + 1.5, H - 3.5, { align: 'center' });

    pdf.setFontSize(4);
    pdf.setTextColor(148, 163, 184);
    pdf.text('innovationconclave.in', detailX + 5, H - 3.5);

    // Footer right: registered date
    pdf.setFontSize(3.5);
    pdf.setTextColor(203, 213, 225); // slate-300
    const regDate = p.registered_at ? new Date(p.registered_at).toLocaleDateString() : '';
    pdf.text(`Registered: ${regDate}`, W - 85, H - 55, { align: 'right' });

    pdf.save(`${ticketId}_IDCard.pdf`);
  }, [p, ticketId, photoUrl]);

  const initials = p.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  return (
    <div>
      {/* Visual preview */}
      <div
        style={{ maxWidth: 628, aspectRatio: '85.6/54' }}
        className="mx-auto rounded-sm overflow-hidden shadow-2xl shadow-orange-300/20 border border-slate-200 dark:border-white/10"
      >
        <div className="w-full h-full flex flex-col" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
          {/* Header */}
          <div className="flex-shrink-0 bg-gradient-to-r from-cyan-300 via-indigo-600 to-purple-700 relative overflow-hidden" style={{ height: '33%' }}>
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full" />
            <div className="p-3 relative z-10 flex justify-between items-start h-full">
              <div>
                <p className="text-[7px] text-slate-900 font-bold uppercase tracking-[2px]">Innovation Conclave 2026</p>
                <p className="text-[13px] text-white font-extrabold mt-0.5">PARTICIPANT ID CARD</p>
                <p className="text-[6px] text-slate-900 mt-0.5">March 28–29 · AITAM, Tekkali</p>
              </div>
              <div className="bg-white/15 rounded-sm px-2.5 py-1.5 border border-white/20">
                <p className="text-[6px] text-orange-300 font-bold">TICKET ID</p>
                <p className="text-[10px] text-white font-extrabold">{ticketId}</p>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 bg-white px-4 pt-2 pb-2 flex gap-3 relative">
            {/* Photo */}
            <div className="flex flex-col items-center gap-1" style={{ marginTop: -14 }}>
              {photoUrl ? (
                <img src={photoUrl} alt={p.name} className="w-14 h-14 object-cover rounded-xl border-[3px] border-white shadow-lg bg-slate-100 shrink-0" />
              ) : (
                <div className="w-14 h-14 rounded-xl border-[3px] border-white shadow-lg bg-gradient-to-br from-orange-300 to-indigo-600 flex items-center justify-center shrink-0">
                  <span className="text-white font-extrabold text-lg">{initials}</span>
                </div>
              )}
              <span className="text-[6px] font-bold text-emerald-700 bg-emerald-100 rounded-full px-1.5 py-0.5">VERIFIED</span>
            </div>

            {/* Info */}
            <div className="flex-1 flex flex-col justify-between min-w-0" style={{ marginTop: -4 }}>
              <div>
                <p className="font-extrabold text-slate-900 text-sm leading-tight truncate">{p.name}</p>
                <p className="text-[8px] text-slate-500 font-semibold">{p.department}</p>
              </div>
              <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mt-1">
                {[
                  ['College', p.college],
                  ['Email', p.email],
                  ['Phone', p.phone],
                  ['Lunch', p.lunch ? 'Yes - Opted In' : 'No - Not selected'],
                ].map(([k, v]) => (
                  <div key={k} className="min-w-0">
                    <p className="text-[5px] text-slate-400 font-bold uppercase tracking-widest">{k}</p>
                    <p className="text-[7px] text-slate-700 font-semibold truncate">{v}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between mt-auto pt-1.5 border-t border-slate-100">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-gradient-to-br from-orange-300 to-indigo-600 flex items-center justify-center">
                    <span className="text-[4px] text-white font-extrabold">IC</span>
                  </div>
                  <span className="text-[5px] text-slate-400 font-bold">innovationconclave.in</span>
                </div>
                <span className="text-[5px] text-slate-300 font-semibold">
                  Registered: {p.registered_at ? new Date(p.registered_at).toLocaleDateString() : ''}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={downloadPDF}
        className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-sm bg-gradient-to-r from-orange-700 to-indigo-600 text-white font-bold text-sm shadow-lg shadow-orange-300/20 hover:from-orange-300 hover:to-indigo-500 transition-all hover:scale-[1.02] active:scale-95"
      >
        <FileText className="w-4 h-4" /> Download ID Card (PDF)
      </button>
    </div>
  );
}

function drawInitialsBox(pdf, x, y, size, name) {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  // Blue gradient background
  pdf.setFillColor(37, 99, 235);
  pdf.roundedRect(x, y, size, size, 1.5, 1.5, 'F');
  pdf.setFillColor(79, 70, 229);
  pdf.roundedRect(x, y + size / 2, size, size / 2, 0, 0, 'F');

  // Initials text
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(14);
  pdf.setTextColor(255, 255, 255);
  pdf.text(initials, x + size / 2, y + size / 2 + 2, { align: 'center' });
}
