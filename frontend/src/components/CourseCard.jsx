const CourseCard = ({ course }) => {
    return (
        <div className="group relative cursor-pointer transition-transform duration-300 hover:scale-105 rounded-lg">
            <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                {course.image ? (
                    <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                ) : null}
                {(!course.image || course.image) && (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">
                            {course.title.charAt(0)}
                        </span>
                    </div>
                )}
            </div>
            <span>{course.title}</span>
            <span className="truncate">{course.description}</span>

        </div>
    );
};

export default CourseCard;
