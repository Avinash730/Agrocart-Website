import slugify from "slugify";
import Soil from "../models/SoilModel.js";

// Controller function to create a new Soil step
export const createSoil = async (req, res) => {
  try {
    // Destructure name and description from request body
    const { name, descriptions } = req.body;

    // Check if name is provided
    if (!name) {
      return res
        .status(400)
        .send({ success: false, message: "Name is required" });
    }

    // Check if description is provided
    if (!descriptions) {
      return res
        .status(400)
        .send({ success: false, message: "Description is required" });
    }

    // Check if a Soil with the same name already exists
    const existingSoil = await Soil.findOne({ name });

    if (existingSoil) {
      return res
        .status(409)
        .send({ success: false, message: "Soil step already exists" });
    }

    // Create a new Soil instance
    const newSoil = new Soil({
      name,
      slug: slugify(name), // Generate slug from name
      descriptions,
    });

    // Save the new Soil to the database
    await newSoil.save();

    // Respond with success message and the created Soil object
    res.status(201).send({
      success: true,
      message: "New Soil step created",
      soil: newSoil,
    });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error in creating Soil step:", error);
    res.status(500).send({
      success: false,
      message: "Error in creating Soil step",
      error: error.message,
    });
  }
};

// get all the Soil
export const allSoil = async (req, res) => {
  try {
    const soilList = await Soil.find({});
    res.status(200).send({
      success: true,
      message: "All Soil List",
      soil: soilList, // Ensure to use the correct variable name
    });
  } catch (error) {
    console.error("Error while getting all Soil:", error);
    res.status(500).send({
      success: false,
      error: error.message, // Send specific error message
      message: "Error while getting all Soil",
    });
  }
};


//delete Soil
export const deleteSoil = async (req, res) => {
  try {
    const { id } = req.params;
    await Soil.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Soil Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting Soil",
      error,
    });
  }
};
