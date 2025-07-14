import EventModel from '../model/Event.model.js';


//list all events
const getAllEvents = async (req,res) => {
    try {
        const events = await EventModel.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
}

//list single event
const getEventById = async (req, res)=>{
    const {id} = req.params;
    try {
        const event = await EventModel.findById(id);
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//create event for admin only
const createEvent = async (req, res) => {
    const { title, description, date, location } = req.body;
    try {
        const newEvent = new EventModel({ title, description, date, location });
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//update event for admin only
const updateEvent = async (req, res) => {
    const { id } = req.params;
    const { title, description, date, location } = req.body;
    try {
        const updatedEvent = await EventModel.findByIdAndUpdate(
            id, 
            { title, description, date, location },
            { new: true }
        );
        if (!updatedEvent) return res.status(404).json({ message: 'Event not found' });
        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
//delete event for admin only
const deleteEvent = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedEvent = await EventModel.findByIdAndDelete(id);
        if (!deletedEvent) return res.status(404).json({ message: 'Event not found' });
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
};