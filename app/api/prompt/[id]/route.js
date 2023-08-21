import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, { params }) => {
    try {
        await connectToDB();

        const prompt = await Prompt.findById(params.id).populate('creator');

        if (!prompt) return new Response('Prompt not found.', { status: 404 })

        return new Response(JSON.stringify(prompt), { status: 200 })
    }
    catch (error) {
        return new Response('Failed to fetch all prompts', { status: 500 })
    }
}

export const PATCH = async (req, { params }) => {
    const { userId, prompt, tag } = await req.json();

    try {
        await connectToDB();
        const existinfPrompt = await Prompt.findById(params.id).populate('creator');
        if (!existinfPrompt) return new Response('Prompt not found.', { status: 404 });
        existinfPrompt.prompt = prompt;
        existinfPrompt.tag = tag;

        await existinfPrompt.save();

        return new Response(JSON.stringify(existinfPrompt), { status: 200 })
    }
    catch (error) {
        return new Response('Failed to update prompt', { status: 500 })
    }
}

export const DELETE = async (req, { params }) => {
    try {
        await connectToDB();

        await Prompt.findOneAndRemove(params.id);

        return new Response('Prompt delete successfully.', { status: 200 })
    } catch (error) {
        return new Response('Failed to delete prompt.', { status: 500 })
    }
}