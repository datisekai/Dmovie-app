import HomeIcon from "@mui/icons-material/Home";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PageviewIcon from "@mui/icons-material/Pageview";
import HistoryIcon from "@mui/icons-material/History";
import TvIcon from "@mui/icons-material/Tv";
const sidebar = [
  {
    url: "/",
    title: "Trang chủ",
    icon: HomeIcon,
  },
  {
    url: "/movie",
    title: "Phim ngắn",
    icon: YouTubeIcon,
  },
  {
    url: "/tv-show",
    title: "TV Shows",
    icon: TvIcon,
  },
  {
    url: "/search",
    title: "Tìm kiếm",
    icon: PageviewIcon,
  },
  // {
  //     url:'/history',
  //     title:'Lịch sử',
  //     icon:HistoryIcon
  // }
];

export default sidebar;
