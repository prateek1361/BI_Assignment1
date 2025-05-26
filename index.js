const express = require("express");
const app = express();
const { initializeDatabase } = require("./db/db.connect");
const Event = require("./event");

app.use(express.json());

initializeDatabase();

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

async function getAllEvents() {
    try {
        return await Event.find();
    } catch (error) {
        console.log(error);
        throw error;
    }
}

app.get("/events", async (req, res) => {
    try {
        const events = await getAllEvents();
        if (events.length !== 0) {
            res.json(events);
        } else {
            res.status(404).json({ error: "No events found." });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch events." });
    }
});

async function getEventsById() {
    try {
        return await Event.findById(eventId);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

app.get("/events", async (req, res) => {
    try {
        const events = await getAllEvents(req.params.id);
        res.json(events)
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch events." });
    }
});

async function createEvent(newEvent){
    try{
        const event = new Event(newEvent)
        const saveEvent = await event.save()
        return saveEvent
    } catch(error){
       throw error
    }
}

app.post("/events", async (req, res) => {
    try{
        const savedEvent = await createEvent(req.body)
        res.status(201).json({message: "Event added successfully.", event: savedEvent})
    } catch(error){
        res.status(500).json({error: "Failed to add event"})
    }
})

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})