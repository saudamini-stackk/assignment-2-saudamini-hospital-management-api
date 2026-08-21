const express = require("express");
const Hospital = require("../models/hospital");

const router = express.Router();
// GET ALL HOSPITALS
router.get("/", async (request, response) => {
    try {
        const hospitals = await Hospital.find();

        response.status(200).json(hospitals);

    } catch (error) {
        response.status(500).json({
            message: error.message
        });
    }
});

// GET HOSPITAL BY ID
router.get("/:id", async (request, response) => {
    try {
        const hospital = await Hospital.findById(request.params.id);

        if (!hospital) {
            return response.status(404).json({
                message: "Hospital not found"
            });
        }

        response.status(200).json(hospital);

    } catch (error) {
        response.status(500).json({
            message: error.message
        });
    }
});
router.post("/", async (request, response) => {
    try {
        const { name, city, totalBeds, availableBeds } = request.body;

        if (!name || !city || !totalBeds || !availableBeds) {
            return response.status(400).json({
                message: "All fields are required"
            });
        }

        const hospital = await Hospital.create(request.body);

        response.status(201).json({
            message: "Hospital created successfully",
            hospital: hospital
        });

    } catch (error) {
        response.status(500).json({
            message: error.message
        });
    }
});

router.put("/:id", async (request, response) => {
    try {
        const { name, city, totalBeds, availableBeds } = request.body;

        if (!name || !city || !totalBeds || !availableBeds) {
            return response.status(400).json({
                message: "All fields are required"
            });
        }

        const hospital = await Hospital.findByIdAndUpdate(
            request.params.id,
            request.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!hospital) {
            return response.status(404).json({
                message: "Hospital not found"
            });
        }

        response.status(200).json({
            message: "Hospital updated successfully",
            hospital: hospital
        });

    } catch (error) {
        response.status(500).json({
            message: error.message
        });
    }
});


// DELETE HOSPITAL
router.delete("/:id", async (request, response) => {
    try {
        const hospital = await Hospital.findByIdAndDelete(request.params.id);

        if (!hospital) {
            return response.status(404).json({
                message: "Hospital not found"
            });
        }

        response.status(200).json({
            message: "Hospital deleted successfully"
        });

    } catch (error) {
        response.status(500).json({
            message: error.message
        });
    }
});


module.exports = router;