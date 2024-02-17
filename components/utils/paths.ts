export const paths = {
  home() {
    return '/';
  },
  community() {
    return '/community';
  },
  tasks() {
    return '/tasks';
  },
  login() {
    return '/login';
  },
  register() {
    return '/register';
  },
  friends() {
    return '/friends';
  },
  topicShow(topicSlug: string) {
    return `/community/topics/${topicSlug}`;
  },
  postCreate(topicSlug: string) {
    return `/community/topics/${topicSlug}/posts/new`;
  },
  postShow(topicSlug: string, postId: string) {
    return `/community/topics/${topicSlug}/posts/${postId}`;
  },
};