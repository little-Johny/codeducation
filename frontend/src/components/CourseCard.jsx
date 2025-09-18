import React from "react";

const CourseCard = ({ course }) => {
    console.log("[DEBUG] CourseCard rendering:", {
        courseId: course.id,
        courseTitle: course.title,
        hasImage: !!course.image,
        imageUrl: course.image,
    });

    return (
        <div className="group relative cursor-pointer transition-transform duration-300 hover:scale-105 rounded-lg">
            <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                {course.image ? (
                    <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                            console.log("[DEBUG] Image failed to load:", course.image);
                            e.target.style.display = "block";
                        }}
                        onLoad={() => {
                            console.log("[DEBUG] Image loaded successfully:", course.image);
                        }}
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">
                            {course.title.charAt(0)}
                        </span>
                    </div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-end p-4">
                    <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <h3 className="text-lg font-semibold mb-1">{course.title}</h3>
                        <p className="text-sm text-gray-200 mb-2">{course.category}</p>
                        <p className="text-xs text-gray-300 line-clamp-2">{course.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
