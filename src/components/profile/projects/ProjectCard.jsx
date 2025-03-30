import ImageGallery from '../../general-ui/ImageGallery';

export default function ProjectCard({ project }) {
  const placeholderImages = [
    'https://placehold.co/600x400',
    // 'https://placehold.co/600x400',
    // 'https://placehold.co/600x400',
    // 'https://placehold.co/600x400',
  ];
  return (
    <div className="w-full relative bg-white dark:bg-elementBlack shadow-md rounded-md border border-gray-300 dark:border-darkBorder dark:text-white h-[160px] overflow-y-auto">
      <div className="p-1 px-2 flex justify-center items-center h-full">
        <div className="sm:flex sm:gap-3 sm:h-[140px] w-full items-center md:justify-start justify-center">
          <div className="hidden sm:flex">
            <ImageGallery
              images={placeholderImages}
              width="200px"
              height="140px"
            />
          </div>
          <div>
            <div className="text-sm text-logoOrange font-bold mb-1">
              {project.title}
            </div>
            {project.description && (
              <div className="text-xs mb-1">
                {project.description.slice(0, 100)}
                {project.description.length > 100 && <span>...</span>}
              </div>
            )}
            <div className="flex flex-wrap gap-1">
              {project.skills_used.slice(0, 5).map((skill) => (
                <div
                  key={skill}
                  className="bg-orange-300 rounded p-1 text-[10px] "
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
