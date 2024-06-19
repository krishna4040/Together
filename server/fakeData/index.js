const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    password: String,
    profileDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    },
    requests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
});

const profileSchema = new mongoose.Schema({
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    dob: {
        type: Date,
        default: null
    },
    age: {
        type: Number,
        default: null
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    about: {
        type: String,
        default: 'New to together'
    },
    pfp: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    visibility: {
        type: String,
        enum: ['public', 'private'],
        default: 'Public'
    }
});

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: String,
    images: [String],
    desc: String,
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});

const User = mongoose.model('User', userSchema);
const Profile = mongoose.model('Profile', profileSchema);
const Post = mongoose.model('Post', postSchema);

mongoose.connect('mongodb://localhost:27017/fakeDataDB', { useNewUrlParser: true, useUnifiedTopology: true });

async function generateFakeData() {
    await mongoose.connection.dropDatabase();

    const users = [];
    const profiles = [];
    const posts = [];

    for (let i = 0; i < 5; i++) {
        const user1 = new User({
            userName: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        });

        const user2 = new User({
            userName: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        })

        const user3 = new User({
            userName: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        })

        user1.friends.push(user2._id);
        user2.friends.push(user1._id);

        user1.requests.push(user3._id);
        user3.requests.push(user2._id);

        const profile1 = new Profile({
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            dob: faker.date.past(),
            age: faker.number.int({ min: 18, max: 100 }),
            gender: faker.helpers.arrayElement(['Male', 'Female', 'Other']),
            about: faker.lorem.sentence(),
            pfp: faker.image.avatar(),
            user: user1._id,
            visibility: 'private'
        });

        const profile2 = new Profile({
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            dob: faker.date.past(),
            age: faker.number.int({ min: 18, max: 100 }),
            gender: faker.helpers.arrayElement(['Male', 'Female', 'Other']),
            about: faker.lorem.sentence(),
            pfp: faker.image.avatar(),
            user: user2._id,
            visibility: 'public'
        });

        const profile3 = new Profile({
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            dob: faker.date.past(),
            age: faker.number.int({ min: 18, max: 100 }),
            gender: faker.helpers.arrayElement(['Male', 'Female', 'Other']),
            about: faker.lorem.sentence(),
            pfp: faker.image.avatar(),
            user: user3._id,
            visibility: 'private'
        });

        user1.profileDetails = profile1._id;
        user2.profileDetails = profile2._id;
        user3.profileDetails = profile3._id;

        users.push(user1);
        users.push(user2);
        users.push(user3);

        profiles.push(profile1);
        profiles.push(profile2);
        profiles.push(profile3);

        for (let j = 0; j < 5; j++) {
            const post = new Post({
                user: user1._id,
                title: faker.lorem.sentence(),
                images: [faker.image.avatar(), faker.image.avatar()],
                desc: faker.lorem.paragraph()
            });
            posts.push(post);
            user1.posts.push(post._id);
        }
        for (let j = 0; j < 5; j++) {
            const post = new Post({
                user: user2._id,
                title: faker.lorem.sentence(),
                images: [faker.image.avatar(), faker.image.avatar()],
                desc: faker.lorem.paragraph()
            });
            posts.push(post);
            user2.posts.push(post._id);
        }
        for (let j = 0; j < 5; j++) {
            const post = new Post({
                user: user3._id,
                title: faker.lorem.sentence(),
                images: [faker.image.avatar(), faker.image.avatar()],
                desc: faker.lorem.paragraph()
            });
            posts.push(post);
            user3.posts.push(post._id);
        }

    }

    await User.insertMany(users);
    await Profile.insertMany(profiles);
    await Post.insertMany(posts);

    mongoose.connection.close();
}

generateFakeData().then(() => console.log('Fake data generated successfully'));