import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";
import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
dotenv.config();

const port = 5555;
const app = express();

app.use(bodyParser.json());

app.use(cors());

const sql = neon(`${process.env.DATABASE_URL}`);

app.get("/products", async (request, response) => {
  try {
    const sqlResponse = await sql`SELECT * FROM products`;

    response.json({ data: sqlResponse, success: true });
  } catch (error) {
    response.json({ error: error, success: false });
  }
});

app.post("/product", async (request, response) => {
  const { name, description, price, image_url } = request.body;

  if (!name || !description || !price || !image_url) {
    return response.status(400).json({ error: "All fields are required." });
  }

  if (isNaN(price) || price <= 0) {
    return response
      .status(400)
      .json({ error: "Price must be a positive number." });
  }

  try {
    const sqlResponse = await sql`
      INSERT INTO products ( name, description, price, image_url)
      VALUES ( ${name}, ${description}, ${price}, ${image_url})
      RETURNING *;`;

    response.json(sqlResponse);
  } catch (error) {
    console.error("Error adding product:", error);
    if (error.code === "23505") {
      // PostgreSQL unique violation code
      return response
        .status(409)
        .json({ error: "Product with this ID already exists." });
    }
    response
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

app.delete("/product", async (request, response) => {
  const { id } = request.body;

  try {
    const sqlDeleteResponse = await sql`
      DELETE FROM products 
     WHERE id=${id}
      RETURNING *;`;

    response.json(sqlDeleteResponse);
  } catch (error) {
    console.error("Error deleting product:", error);
  }
});

app.post("/sign-up", async (request, response) => {
  const { name, email, address } = request.body;

  if (!name || !email || !address) {
    return response.status(400).json({ error: "All fields are required." });
  }

  try {
    const sqlResponse = await sql`
      INSERT INTO customers ( name, email, address)
      VALUES ( ${name}, ${email}, ${address})
      RETURNING *;`;

    response.json(sqlResponse);
  } catch (error) {
    console.error("Error adding product:", error);
    if (error.code === "23505") {
      return response
        .status(409)
        .json({ error: "Product with this ID already exists." });
    }
    response
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

app.post("/sign-in", (request, response) => {
  const { name, email } = request.body;

  fs.readFile("./data/user.json", "utf-8", (readError, data) => {
    if (readError) {
      response.json({
        success: false,
        error: error,
      });
    }

    let savedData = data ? JSON.parse(data) : [];

    const registeredUser = savedData.filter(
      (user) => user.name === name && user.email === email
    );
    if (registeredUser.length > 0) {
      response.json({
        success: true,
        user: registeredUser[0],
      });
    } else {
      response.json({
        success: false,
      });
    }
  });
});

// edit-legdsen gants data butsaadag bolgoh like Delete

app.put("/product", (request, response) => {
  const { id, name, description, price, image_url } = request.body;

  fs.readFile("./data/products.json", "utf-8", (readError, data) => {
    if (readError) {
      response.json({
        success: false,
        error: error,
      });
    }

    let dbData = data ? JSON.parse(data) : [];

    const editedData = dbData.map((data) => {
      if (data?.id === id) {
        return {
          id,
          name,
          description,
          price,
          image_url,
        };
      }
      return data;
    });

    fs.writeFile(
      "./data/products.json",
      JSON.stringify(editedData),
      (error) => {
        if (error) {
          response.json({
            success: false,
            error: error,
          });
        } else {
          response.json({
            success: true,
            products: editedData,
          });
        }
      }
    );
  });
});

app.listen(port, () => {
  console.log(`Server ajillaj bn http://localhost:${port}`);
});

// app.get("/products", (request, response) => {
//   fs.readFile("./data/products.json", "utf-8", (readError, data) => {
//     if (readError) {
//       response.json({
//         success: false,
//         error: error,
//       });
//     }
//     let dbData = data ? JSON.parse(data) : [];

//     response.json(dbData);
//   });
// });

// app.post("/product", (request, response) => {
//   console.log("irlee");

//   const { name, description, price, image_url } = request.body;
//   console.log("price", price, name, description);

//   fs.readFile("./data/products.json", "utf-8", (readError, data) => {
//     if (readError) {
//       response.json({
//         success: false,
//         error: readError,
//       });
//     }

//     let dbData = data ? JSON.parse(data) : [];

//     const newProduct = {
//       id: Date.now().toString(),
//       name: name,
//       description: description,
//       price: price,
//       image_url: image_url,
//     };

//     dbData.push(newProduct);

//     fs.writeFile("./data/products.json", JSON.stringify(dbData), (error) => {
//       if (error) {
//         response.json({
//           success: false,
//           error: error,
//         });
//       } else {
//         response.json({
//           success: true,
//           product: newProduct,
//         });
//       }
//     });
//   });
// });

// app.post("/sign-up", (request, response) => {
//   const { name, email, address } = request.body;

//   fs.readFile("./data/user.json", "utf-8", (readError, data) => {
//     let savedData = data ? JSON.parse(data) : [];

//     if (readError) {
//       response.json({
//         success: false,
//         error: error,
//       });
//     }
//     const newUser = {
//       id: Date.now().toString(),
//       name: name,
//       email: email,
//       address: address,
//     };
//     savedData.push(newUser);

//     fs.writeFile("./data/user.json", JSON.stringify(savedData), (error) => {
//       if (error) {
//         response.json({
//           success: false,
//           error: error,
//         });
//       } else {
//         response.json({
//           success: true,
//           user: newUser,
//         });
//       }
//     });
//   });
// });

//Prodct.json deerh BE-s data ustgaj bui heseg

// app.delete("/product", (request, response) => {
//   const { id } = request.body;

// fs.readFile("./data/products.json", "utf-8", (readError, data) => {
//   if (readError) {
//     response.json({
//       success: false,
//       error: error,
//     });
//   }

//   let dbData = data ? JSON.parse(data) : [];

//   const filteredData = dbData.filter((data) => data?.id !== id);

//   const deleteProduct = dbData.find((data) => data?.id === id);

//   if (filteredData.length === dbData.length) {
//     response.json({
//       success: false,
//       error: "Product id not found",
//     });
//   }

//   fs.writeFile(
//     "./data/products.json",
//     JSON.stringify(filteredData),
//     (error) => {
//       if (error) {
//         response.json({
//           success: false,
//           error: error,
//         });
//       } else {
//         response.json({
//           success: true,
//           products: deleteProduct,
//         });
//       }
//     }
//   );
// });

//Prodct.json deerh BE-s data edit hiij bui heseg

// app.put("/product", (request, response) => {
//   const { id, name, description, price, image_url } = request.body;

//   fs.readFile("./data/products.json", "utf-8", (readError, data) => {
//     if (readError) {
//       response.json({
//         success: false,
//         error: error,
//       });
//     }

//     let dbData = data ? JSON.parse(data) : [];

//     const editedData = dbData.map((data) => {
//       if (data?.id === id) {
//         return {
//           id,
//           name,
//           description,
//           price,
//           image_url,
//         };
//       }
//       return data;
//     });

//     fs.writeFile(
//       "./data/products.json",
//       JSON.stringify(editedData),
//       (error) => {
//         if (error) {
//           response.json({
//             success: false,
//             error: error,
//           });
//         } else {
//           response.json({
//             success: true,
//             products: editedData,
//           });
//         }
//       }
//     );
//   });
// });
