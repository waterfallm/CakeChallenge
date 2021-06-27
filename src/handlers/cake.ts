import { request, Request, Response } from 'express';

const fs = require('fs');

console.log("Importing Cake Routes")


export interface ICake {
  id: string;
  name: number;
  comment: string;
  imageUrl: number;
  yumFactor: number;

}

const getcakes = async (req: Request, res: Response) => {
  // console.log("FUNC:", "getcakes")

  try {

    let rawdata = fs.readFileSync(__dirname + '/../data/cakes.json');
    let cakes: ICake[] = JSON.parse(rawdata);

    // res.status(200).send(cakes);
    res.status(200).send(cakes.map(({ id, name, imageUrl }) => ({ id, name, imageUrl })));

  } catch (err) {
    console.log(err);
    res.status(500).send(err.message || err);
  }
};

const getcake = async (req: Request, res: Response) => {
  // console.log("FUNC:", "getcake")
  const id = req.params.id

  try {
    let rawdata = fs.readFileSync(__dirname + '/../data/cakes.json');
    let cakes = JSON.parse(rawdata);


    if (cakes.find((o: any) => o.id == id)) {

      var filteredcakes = cakes.filter((a: any) => a.id == req.params.id);

      res.status(200).send(...filteredcakes);

    } else {
      res.status(200).send({ "message": "No Cake with that ID" });
    }

  } catch (err) {
    console.log(err);
    res.status(500).send(err.message || err);
  }
};

const deletecake = async (req: Request, res: Response) => {
  // console.log("FUNC:", "deletecake")
  const delid = req.params.id

  try {
    let rawdata = fs.readFileSync(__dirname + '/../data/cakes.json');
    let cakes = JSON.parse(rawdata);


    if (cakes.find((o: any) => o.id == delid)) {

      var filteredcakes = cakes.filter((a: any) => a.id != req.params.id);

      let newfile = fs.writeFileSync(__dirname + '/../data/cakes.json', JSON.stringify(filteredcakes));
      res.status(200).send({ "message": "Cake with ID removed" });

    } else {
      res.status(406).send({ "message": "No Cake with that ID" });
    }

  } catch (err) {
    console.log(err);
    res.status(500).send(err.message || err);
  }
};

const addcake = async (req: Request, res: Response) => {
  // console.log("FUNC:", "addcake")
  const newcake = req.body

  try {
    let rawdata = fs.readFileSync(__dirname + '/../data/cakes.json');
    let cakes = JSON.parse(rawdata);

    const newCake = { ...newcake, id: cakes.length + 1 }

    if (newcake.name || newcake.comment || newcake.imageUrl || newcake.yumFactor) {
      cakes = [...cakes, newCake]
      let newfile = fs.writeFileSync(__dirname + '/../data/cakes.json', JSON.stringify(cakes));

      res.status(200).send({ "message": "New cake added" });
    } else {
      res.status(406).send({ "message": "New Data data not complete" });
    }


  } catch (err) {
    console.log(err);
    res.status(500).send(err.message || err);
  }
};

export default {
  getcakes,
  getcake,
  addcake,
  deletecake
};
