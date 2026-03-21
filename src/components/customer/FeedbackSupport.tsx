import { useState } from "react";
import { Star, MessageCircle, Phone, Send, Bell } from "lucide-react";

const FeedbackSupport = () => {
  const [feedback, setFeedback] = useState({
    rating: 0,
    comment: ""
  });

  const [chatMessage, setChatMessage] = useState("");

  const announcements = [
    {
      id: 1,
      title: "New Menu Items Available!",
      message: "Check out our new seasonal menu featuring fresh ingredients",
      date: "March 3, 2026"
    },
    {
      id: 2,
      title: "Extended Hours This Weekend",
      message: "We'll be open until midnight on Friday and Saturday",
      date: "March 2, 2026"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground">
          Feedback & Support
        </h2>
        <p className="text-muted-foreground mt-1">
          Share your experience and get help
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Submit Feedback */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Star className="size-5 text-yellow-500" />
            Submit Your Feedback
          </h3>

          <div className="space-y-4">
            {/* Rating Stars */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Rate Your Experience
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setFeedback({ ...feedback, rating: star })}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`size-8 ${
                        star <= feedback.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
              {feedback.rating > 0 && (
                <p className="text-sm text-muted-foreground mt-1">
                  {feedback.rating === 5 && "Excellent! 🎉"}
                  {feedback.rating === 4 && "Great! 😊"}
                  {feedback.rating === 3 && "Good 👍"}
                  {feedback.rating === 2 && "Could be better 🤔"}
                  {feedback.rating === 1 && "Needs improvement 😔"}
                </p>
              )}
            </div>

            {/* Feedback Comment */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Share Your Thoughts
              </label>
              <textarea
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                rows={5}
                placeholder="Tell us about your experience..."
                value={feedback.comment}
                onChange={(e) =>
                  setFeedback({ ...feedback, comment: e.target.value })
                }
              />
            </div>

            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-colors font-bold">
              <Send className="size-4" />
              Submit Feedback
            </button>
          </div>
        </div>

        {/* Chat Support */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <MessageCircle className="size-5 text-blue-500" />
            Chat with Support
          </h3>

          <div className="space-y-4">
            {/* Chat Messages */}
            <div className="h-64 overflow-y-auto border border-border rounded-lg p-4 bg-muted/30">
              <div className="space-y-3">
                {/* Support Message */}
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">S</span>
                  </div>
                  <div className="bg-white border border-border rounded-lg px-3 py-2 max-w-xs">
                    <p className="text-sm">Hello! How can we help you today?</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      10:30 AM
                    </p>
                  </div>
                </div>

                {/* User Message */}
                <div className="flex gap-2 justify-end">
                  <div className="bg-blue-500 text-white rounded-lg px-3 py-2 max-w-xs">
                    <p className="text-sm">I have a question about my order</p>
                    <p className="text-xs opacity-75 mt-1">10:32 AM</p>
                  </div>
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">U</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Input */}
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Type your message..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
              />
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                <Send className="size-4" />
              </button>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              Average response time: 2 minutes
            </p>
          </div>
        </div>
      </div>

      {/* Contact Restaurant */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg p-6 text-white">
        <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
          <Phone className="size-6" />
          Contact Restaurant Directly
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/20 rounded-lg p-4">
            <p className="text-sm opacity-90 mb-1">Phone</p>
            <p className="font-bold text-lg">+1-234-567-8900</p>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <p className="text-sm opacity-90 mb-1">Email</p>
            <p className="font-bold text-lg">support@restaurant.com</p>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <p className="text-sm opacity-90 mb-1">Hours</p>
            <p className="font-bold text-lg">9 AM - 10 PM</p>
          </div>
        </div>
      </div>

      {/* Announcements */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <Bell className="size-5 text-orange-500" />
          Restaurant Announcements
        </h3>

        <div className="space-y-3">
          {announcements.map((announcement) => (
            <div
              key={announcement.id}
              className="border-l-4 border-orange-500 bg-orange-50 rounded-r-lg p-4"
            >
              <div className="flex items-start justify-between mb-1">
                <h4 className="font-bold">{announcement.title}</h4>
                <span className="text-xs text-muted-foreground">
                  {announcement.date}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {announcement.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedbackSupport;
