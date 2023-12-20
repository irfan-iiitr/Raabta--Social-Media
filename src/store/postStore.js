import {create} from"zustand";

const usePostStore = create((set)=>({
    posts:[],
    createPost:(post)=>set(state => ({posts:[post,...state.posts]})),
    //dletePost
    deletePost:(id)=>set(state => ({posts:state.posts.filter(p=>p.id!==id)})),
    //addComment:(comment
    //setPosts
    setPosts: (posts)=>set({posts}),
    addComment:(postId,comment)=>set((state)=>({
        posts:state.posts.map((post)=>post.id===postId?{...post,comments:[...post.comments,comment]}:post)
    }))


}));

export default usePostStore;