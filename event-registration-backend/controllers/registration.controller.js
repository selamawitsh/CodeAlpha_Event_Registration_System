import EventModel from '../model/Event.model.js';
import RegistrationModel from "../model/Registration.model.js";

const registerForEvent = async(req, res) => {
    const {eventId} = req.body;
    const userId = req.user.id;
    try {
        const event = await EventModel.findById(eventId);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        const existingRegistration = await RegistrationModel.findOne({ event: eventId, user: userId });
        if (existingRegistration) return res.status(400).json({ message: 'User already registered for this event' });

        const registration = await RegistrationModel.create({ event: eventId, user: userId });
        res.status(201).json({ message: 'Registration successful', registration });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

const getMyRegistations = async (req, res) => {
  try {
    const registrations = await RegistrationModel.find({ user: req.user.id }).populate('event');
    
    if (!registrations || registrations.length === 0) {
      return res.status(404).json({ message: 'No registrations found' });
    }

    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


const cancelRegistration = async (req, res) => {
  try {
    const reg = await RegistrationModel.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!reg) return res.status(404).json({ message: 'Registration not found' });

    res.json({ message: 'Registration cancelled' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export { registerForEvent, getMyRegistations, cancelRegistration };