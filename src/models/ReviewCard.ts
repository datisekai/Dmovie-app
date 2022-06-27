export default interface ReviewCard {
  image: string;
  name: string;
  content: string;
  createdAt: string;
  uuid?: string;
  userId?: string;
  media_type?: string;
  reactions?: any;
  childs?: any[];
  listComments?: any[];
}
