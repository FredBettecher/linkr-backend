import { postLikes, postDislikes } from "../repositorys/likeQuerie.js";

async function like(req, res) {
    const { userId } = req.locals.userId;
    const { postId } = req.body;

    try {
        await postLikes(postId, userId);
        
        return res.status(201).send("Like postado com sucesso");
    } catch(error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
}

async function dislike(req, res) {
    const { userId } = req.locals.user;
    const { postId } = req.params;

    try {
        await postDislikes (postId, userId);
            
        return res.status(201).send("Like deletado com sucesso");
    } catch(error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
}

export { like, dislike }