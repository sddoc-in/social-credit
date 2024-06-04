import express from "express";
import { register } from "../controller/register";
import { login } from "../controller/login";
import { getdiscordUser,UpdateUser,deleteUser,getAllUser } from "../controller/discordUser";
import {createPannelUser,deletePannelUser,updatePannelUser,getAllPannelUsers} from "../controller/paneluser"
import { createPhrase ,updatePhrase,deletePhrase,getAllPhrases, getPhraseDetails} from "../controller/phrases";
import { getTopTenMostPointsDiscordUsers, mostPointedPhrase, mostUsedPhrase } from "../controller/getGraphs";
import { getApproverNotifications, getNotifications, updateNotification } from "../controller/notifications";
import { getAllWordPhrases } from "../controller/wordPhrases";
const router = express.Router();

router.post("/api/register", register);
router.get("/api/login", login);

// discord users routes
router.get("/api/discord/user",getdiscordUser)
router.put("/api/discord/update",UpdateUser)
router.delete("/api/discord/delete",deleteUser)
router.get("/api/discord/users/all",getAllUser)

//pannelusers routes
router.post("/api/panel-user/create", createPannelUser);
router.delete("/api/panel-user/delete", deletePannelUser);
router.put("/api/panel-user/update", updatePannelUser);
router.get("/api/panel-user/all", getAllPannelUsers);

//phrases routes
router.post("/api/phrase/create", createPhrase);
router.put("/api/phrase/update", updatePhrase);
router.delete("/api/phrase/delete", deletePhrase);
router.get("/api/phrases", getPhraseDetails);
router.get("/api/phrases/all", getAllPhrases);

// graphs details
router.get("/api/graphs/discord-users", getTopTenMostPointsDiscordUsers);
router.get("/api/graphs/phrase", mostUsedPhrase);
router.get("/api/graphs/phrase-points", mostPointedPhrase);

// notifications
router.get("/api/notifications/approver", getApproverNotifications);
router.get("/api/notifications/user", getNotifications);
router.post("/api/notifications/update", updateNotification);

//Wordpharses
router.get("/api/wordphrases/all", getAllWordPhrases);


export default router;
