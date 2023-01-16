import UserPlusIcon from "../../assets/icons/UserPlusIcon";
import FollowerIcon from "../../assets/icons/FollowerIcon";


const followers = [
    {
        image: "/static/avatar/040-man-11.svg",
        name: "Mr. Breast",
        profession: "Product Designer",
        following: true,
    },
    {
        image: "/static/avatar/041-woman-11.svg",
        name: "Ethan Drake",
        profession: "UI Designer",
        following: true,
    },
    {
        image: "/static/avatar/042-vampire.svg",
        name: "Selena Gomez",
        profession: "Marketing Manager",
        following: false,
    },
    {
        image: "/static/avatar/043-chef.svg",
        name: "Sally Becker",
        profession: "UI Designer",
        following: true,
    },
    {
        image: "/static/avatar/044-farmer.svg",
        name: "Dua Lipa",
        profession: "Marketing Manager",
        following: false,
    },
    {
        image: "/static/avatar/045-man-12.svg",
        name: "Joe Murry",
        profession: "Product Designer",
        following: true,
    },
    {
        image: "/static/avatar/040-man-11.svg",
        name: "Mr. Breast",
        profession: "Product Designer",
        following: true,
    },
    {
        image: "/static/avatar/041-woman-11.svg",
        name: "Ethan Drake",
        profession: "UI Designer",
        following: true,
    },
    {
        image: "/static/avatar/042-vampire.svg",
        name: "Selena Gomez",
        profession: "Marketing Manager",
        following: false,
    },
    {
        image: "/static/avatar/043-chef.svg",
        name: "Sally Becker",
        profession: "UI Designer",
        following: true,
    },
    {
        image: "/static/avatar/044-farmer.svg",
        name: "Dua Lipa",
        profession: "Marketing Manager",
        following: false,
    },
    {
        image: "/static/avatar/045-man-12.svg",
        name: "Joe Murry",
        profession: "Product Designer",
        following: true,
    },
];

const friends = [
    {
        name: "Selena Gomez",
        image: "/static/avatar/012-woman-2.svg",
        profession: "Marketing Manager",
        facebookUrl: "",
        twitterUrl: "",
        instagramUrl: "",
        dribbleUrl: "",
    },
    {
        name: "Selena Gomez",
        image: "/static/avatar/012-woman-2.svg",
        profession: "Marketing Manager",
        facebookUrl: "",
        twitterUrl: "",
        instagramUrl: "",
        dribbleUrl: "",
    },
    {
        name: "Selena Gomez",
        image: "/static/avatar/012-woman-2.svg",
        profession: "Marketing Manager",
        facebookUrl: "",
        twitterUrl: "",
        instagramUrl: "",
        dribbleUrl: "",
    },
    {
        name: "Selena Gomez",
        image: "/static/avatar/012-woman-2.svg",
        profession: "Marketing Manager",
        facebookUrl: "",
        twitterUrl: "",
        instagramUrl: "",
        dribbleUrl: "",
    },
    {
        name: "Selena Gomez",
        image: "/static/avatar/012-woman-2.svg",
        profession: "Marketing Manager",
        facebookUrl: "",
        twitterUrl: "",
        instagramUrl: "",
        dribbleUrl: "",
    },
    {
        name: "Selena Gomez",
        image: "/static/avatar/012-woman-2.svg",
        profession: "Marketing Manager",
        facebookUrl: "",
        twitterUrl: "",
        instagramUrl: "",
        dribbleUrl: "",
    },
    {
        name: "Selena Gomez",
        image: "/static/avatar/012-woman-2.svg",
        profession: "Marketing Manager",
        facebookUrl: "",
        twitterUrl: "",
        instagramUrl: "",
        dribbleUrl: "",
    },
    {
        name: "Selena Gomez",
        image: "/static/avatar/012-woman-2.svg",
        profession: "Marketing Manager",
        facebookUrl: "",
        twitterUrl: "",
        instagramUrl: "",
        dribbleUrl: "",
    },
    {
        name: "Selena Gomez",
        image: "/static/avatar/012-woman-2.svg",
        profession: "Marketing Manager",
        facebookUrl: "",
        twitterUrl: "",
        instagramUrl: "",
        dribbleUrl: "",
    },
];

const getCountListForClient = (user) => {
    return [
        {
            title: 'Subscriptions',
            value: user.client.content_subscriptions_count,
            icon:  <UserPlusIcon fontSize="small" />
        },
        {
            title: 'Downloads',
            value: user.client.downloads_count,
            icon:  <FollowerIcon fontSize="small" />,
            iconColor: '#FF9777'
        },
    ]
}

const getCountListForCreator = (user, short = false) => {

    return [
        {
            title: 'Followers',
            value: user.creator.subscribes_count,
            icon:  <FollowerIcon fontSize="small" />,
            iconColor: '#FF9777'
        },
        {
            title: 'Downloads',
            value: user.creator.total_downloads_count,
            icon:  <FollowerIcon fontSize="small" />,
            iconColor: '#FF9777'
        },
        {
            title: 'Views',
            value: user.creator.total_views_count,
            icon:  <FollowerIcon fontSize="small" />,
            iconColor: '#FF9777'
        },
        {
            title: 'Likes',
            value: user.creator.total_likes_count,
            icon:  <FollowerIcon fontSize="small" />,
            iconColor: '#FF9777'
        },
        {
            title: 'Images',
            value: user.creator.images_count,
            icon:  <FollowerIcon fontSize="small" />,
            iconColor: '#FF9777'
        },
    ]
}

export {
    followers,
    friends,
    getCountListForClient,
    getCountListForCreator
}