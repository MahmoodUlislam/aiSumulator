// saveCustomerAPI.js
import dbConnect from "../../utils/dbConnect";
import Customer from "../../utils/models/customer";

export default async function saveCustomerAPI(req, res) {
  const { method, body } = req;
  await dbConnect();

  switch (method) {
    case "POST":
      try {
        // Check if the customer with the provided email already exists
        const existingCustomer = await Customer.findOne({ email: body.email });

        if (existingCustomer) {
          // If customer exists, update their information
          await Customer.findOneAndUpdate({ email: body.email }, body);
          res.status(200).json({ message: "Your details for the lucky draw registration have been updated." });
        } else {
          // If customer doesn't exist, create a new customer
          const newCustomer = new Customer(body);
          await newCustomer.save();
          res.status(201).json({ message: "Your registration for the lucky draw has been received." });
        }
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
      break;
    default:
      res.status(405).json({ message: "Method Not Allowed" });
      break;
  }
}

