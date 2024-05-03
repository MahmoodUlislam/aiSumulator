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
          const currentTime = new Date();
          currentTime.setHours(currentTime.getHours() - 6);
          const currentTimeString = `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;
          const currentDateString = `${currentTime.getDate()}/${currentTime.getMonth() + 1}/${currentTime.getFullYear()}`;
          const newCustomerData = {
            ...body,
            submissionTime: currentTimeString,
            submissionDate: currentDateString
          };
          const newCustomer = new Customer(newCustomerData);
          await newCustomer.save();
          res.status(201).json({ message: "Your registration for the lucky draw is received." });
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

