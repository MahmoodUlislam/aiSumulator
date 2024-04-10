import dbConnect from "../../utils/dbConnect";
import Customer from "../../utils/models/customer"; // Import the Customer model from the correct file

export default async function handler(req, res) {
  const { method, body } = req;
  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const newCustomer = new Customer(body); // Use the Customer model instead of the User model
        await newCustomer.save();
        res.status(201).json(newCustomer);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
      break;
    default:
      res.status(405).json({ message: "Method Not Allowed" });
      break;
  }
}
