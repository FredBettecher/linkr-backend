import { postLikes, postDislikes, usersLiked, getLikesPost, countLikes  } from "../repositorys/likeQuerie.js";

async function like(req, res) {
    const { postId } = req.params;
    const { user } = res.locals.user;

    try {
        await postLikes(postId, user.id);
        
        return res.status(201).send("Like postado com sucesso");
    } catch(error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
}

async function dislike(req, res) {
    const { postId } = req.params;
    const { userId } = res.locals.user;

    try {
        await postDislikes (postId, user.id);
            
        return res.status(201).send("Like deletado com sucesso");
    } catch(error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
}

async function getLikes(req, res) {
    const { postId }= req.params;
    const { user } = res.locals.user;
    let isLiked = false;

    try{
        const userLike = await usersLiked(postId, user.id);
        const likes = await getLikesPost(postId, user.id);
        const amountLikes = await countLikes(postId);

        if(userLike.rows.length > 0) {
            isLiked = true;
            likes.rows.unshift({ username: "Você" });
        }
        res.json({ likesUsers: likes.rows, liked, amountLikes });
    }catch(error){
        console.log(error.message);
        res.status(500).send(error.message);
    }
}

export { like, dislike, getLikes };