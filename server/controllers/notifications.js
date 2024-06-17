const Notification = require("../models/Notification")

exports.fetchNotifications = async (req, res) => {
    try {
        const { id } = req.user;
        const notifications = await Notification
            .find({ for: id })
            .populate({
                path: 'by',
                populate: 'profileDetails'
            })
            .sort({ createdAt: -1 })
            .exec();

        const groupedNotifications = notifications.reduce((acc, notification) => {
            const date = new Date(notification.createdAt);
            const formattedDate = date.toISOString().split('T')[0];
            const formattedTime = date.toTimeString().split(' ')[0].slice(0, 5);

            const formattedNotification = {
                ...notification.toObject(),
                createdAt: {
                    date: formattedDate,
                    time: formattedTime
                }
            };

            if (!acc[formattedDate]) {
                acc[formattedDate] = [];
            }
            acc[formattedDate].push(formattedNotification);

            return acc;
        }, {});

        res.status(200).json({
            success: true,
            data: groupedNotifications
        });
    } catch (error) {
        console.error(error);
        // Send error response
        res.status(500).json({ message: 'Internal server error' });
    }
};