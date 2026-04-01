const model = require('./agenda.model');

async function getAll() {
  return model.findAll();
}

async function addEvent(data) {
  if (!data.day || !data.start_time || !data.time_label || !data.title) {
    throw Object.assign(new Error('Missing required fields: day, start_time, time_label, title'), { code: 400 });
  }
  const id = await model.create(data);
  return { id, message: 'Agenda event created successfully' };
}

async function editEvent(id, data) {
  const affected = await model.update(id, data);
  if (!affected) throw Object.assign(new Error('Event not found'), { code: 404 });
  return { message: 'Agenda event updated successfully' };
}

async function deleteEvent(id) {
  const affected = await model.remove(id);
  if (!affected) throw Object.assign(new Error('Event not found'), { code: 404 });
  return { message: 'Agenda event deleted successfully' };
}

module.exports = { getAll, addEvent, editEvent, deleteEvent };
