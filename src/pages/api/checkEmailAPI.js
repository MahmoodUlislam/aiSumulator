import dbConnect from "../../utils/dbConnect";
import Customer from "../../utils/models/customer";

export default async function checkEmailAPI(req, res) {
    const { method, body } = req;
    await dbConnect();

    switch (method) {
        case "POST":
            try {
                // Check if the customer with the provided email already exists
                const existingCustomer = await Customer.findOne({ email: body.email });

                if (existingCustomer) {
                    res.status(200).json({ exists: true, message: "This account already exists." });
                } else {
                    res.status(201).json({ exists: false, message: body.email });
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

