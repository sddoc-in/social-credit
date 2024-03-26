import express from "express";
import { register } from "../controller/register";
import { login } from "../controller/login";
import { getdiscordUser,UpdateUser,deleteUser,getAllUser } from "../controller/discordUser";
import {createPannelUser,deletePannelUser,updatePannelUser,getAllPannelUsers} from "../controller/paneluser"
import { createPhrase ,updatePhrase,deletePhrase,getAllPhrases,phraseUsageCount} from "../controller/phrases";
const router = express.Router();

router.post("/api/register", register);
router.get("/api/login", login);

// discord users routes
router.get("/api/getdiscordUser",getdiscordUser)
router.put("/api/UpdateUser",UpdateUser)
router.delete("/api/deleteUser",deleteUser)
router.get("/api/getAllUser",getAllUser)

//pannelusers routes
router.post("/api/createPannelUser", createPannelUser);
router.delete("/api/deletePannelUser", deletePannelUser);
router.put("/api/updatePannelUser", updatePannelUser);
router.get("/api/getAllPannelUsers", getAllPannelUsers);

//phrases routes
router.post("/api/createPhrase", createPhrase);
router.put("/api/updatePhrase", updatePhrase);
router.delete("/api/deletePhrase", deletePhrase);
router.get("/api/getAllPhrases", getAllPhrases);
router.get("/api/phraseUsageCount", phraseUsageCount);

export default router;
