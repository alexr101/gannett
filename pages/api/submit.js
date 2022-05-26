import fs from "fs";
import path from "path";

export default function handler(req, res) {
  /*
  Example POST payload expected in request:
  {
    "customer_name": "Lisa Snodgrass",
    "customer_email": "lisa.snodgrass@gothamcitypublicworks.gov"
    "text_body": "Gotham City Public Works is accepting sealed solicitations for a new drinking fountain."
  }
  */
  if (req.method === "POST") {
    const data = JSON.parse(req.body);
    if (
      data.hasOwnProperty("customer_name") === true &&
      data.hasOwnProperty("customer_email") === true &&
      data.hasOwnProperty("text_body") === true &&
      typeof data.customer_name === "string" &&
      typeof data.customer_email === "string" &&
      typeof data.text_body === "string" &&
      data.customer_name.length > 0 &&
      data.customer_email.length > 0 &&
      data.text_body.length > 0
    ) {
      // debugging feedback
      console.debug(`data payload: ${JSON.stringify(data)}`);

      // define filename and path
      // made a couple of tweaks
      // Date method was erroring
      // Math round needed to prevent decimals in file names
      const epoch_date = Math.round(new Date().getTime() / 1000);
      const file_name = `customer_submission_${epoch_date}.json`;
      const base_path = path.join(
        process.cwd(),
        `/public/submissions/${file_name}`
      );
      // write file to public submissions in public directory
      fs.writeFile(base_path, req.body, (err) => {
        if (err) {
          res.status(500).json({ status: "error", message: err });
        }
      });

      // return a 200 for response
      res.status(200).json({
        status: "good",
        message: "information successfully submitted",
      });
    } else {
      res
        .status(500)
        .json({ status: "error", message: "missing or incorrect data" });
    }
  } else {
    res
      .status(500)
      .json({ status: "error", message: "request requirements not met" });
  }
}
