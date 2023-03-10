import { postLikes, postDislikes, getLikes, countLikes } from "../repositorys/likeQuerie.js";

async function like(req, res) {
    const { userId } = res.locals.userId;
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
    const { userId } = res.locals.user;
    const { postId } = req.params;

    try {
        await postDislikes (postId, userId);
            
        return res.status(201).send("Like deletado com sucesso");
    } catch(error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
}

async function getPostLikes(req, res){
    const userId = res.locals.userId;
    const postId = req.body;

    try{
        const likes = await getLikes(postId, userId);

        res.status(201).send(likes);
    }catch(error){
        console.log(error.message);
        res.status(500).send(error.message);
    }
}

async function resultLikes(req, res){
    const userId = res.locals.userId;
    const postId = req.body;

    try{
        const liked = await countLikes(postId, userId);

        res.status(201).send(liked);
    }catch(error){
        console.log(error.message);
        res.status(500).send(error.message);
    }
}

export { like, dislike, getPostLikes, resultLikes }