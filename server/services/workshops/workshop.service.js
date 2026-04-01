// services/workshops/workshop.service.js
const model = require('./workshop.model');

async function listAll() {
  return model.findAll();
}

async function createWorkshop(data) {
  const { title, speaker, time, duration, day, seats } = data;
  if (!title || !speaker || !time || !duration || !day || !seats)
    throw Object.assign(new Error('title, speaker, time, duration, day, seats are required'), { code: 400 });

  const id = await model.create(data);
  return model.findById(id);
}

async function updateWorkshop(id, data) {
  const affected = await model.update(id, data);
  if (!affected)
    throw Object.assign(new Error('Workshop not found'), { code: 404 });

  return model.findById(id);
}

async function deleteWorkshop(id) {
  const affected = await model.remove(id);
  if (!affected)
    throw Object.assign(new Error('Workshop not found'), { code: 404 });

  return { message: 'Workshop deleted' };
}

async function enrollParticipant(participantId, workshopId) {
  const workshop = await model.findById(workshopId);
  if (!workshop) {
    throw Object.assign(new Error('Workshop not found'), { code: 404 });
  }

  if (workshop.seats <= 0) {
    throw Object.assign(new Error('Workshop is fully booked'), { code: 400 });
  }

  const existing = await model.checkRegistration(participantId, workshopId);
  if (existing) {
    throw Object.assign(new Error('You are already registered for this workshop'), { code: 409 });
  }

  const affected = await model.decrementSeats(workshopId);
  if (!affected) {
    throw Object.assign(new Error('Workshop is fully booked'), { code: 400 });
  }

  const registrationId = await model.registerParticipant(participantId, workshopId);
  return { message: 'Successfully registered for the workshop', registrationId };
}

async function getWorkshopParticipants(workshopId) {
  const workshop = await model.findById(workshopId);
  if (!workshop) {
    throw Object.assign(new Error('Workshop not found'), { code: 404 });
  }
  return model.findRegistrationsByWorkshop(workshopId);
}

async function getMyWorkshops(participantId) {
  return model.findWorkshopsByParticipant(participantId);
}

module.exports = { 
  listAll, 
  createWorkshop, 
  updateWorkshop, 
  deleteWorkshop,
  enrollParticipant,
  getWorkshopParticipants,
  getMyWorkshops
};
