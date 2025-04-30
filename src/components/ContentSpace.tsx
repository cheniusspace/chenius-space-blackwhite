import React, { useState } from 'react';

interface ContentItem {
  title: string;
  count?: string;
  type: 'main' | 'category' | 'topic';
  topics?: string[];
}

const ContentSpace: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const content: ContentItem[] = [
    // Main content
    { title: 'TOTAL CONTENT', count: '5', type: 'main' },
    
    // Categories with their topics
    { 
      title: 'Creations', 
      count: '3', 
      type: 'category',
      topics: ['Technology', 'Design', 'Music']
    },
    { 
      title: 'Journals', 
      count: '1', 
      type: 'category',
      topics: ['Personal', 'Philosophy']
    },
    { 
      title: 'Favorites', 
      count: '1', 
      type: 'category',
      topics: ['Art', 'Science', 'Architecture']
    }
  ];

  return (
    <div className="w-full">
      <div className="w-[1280px] max-w-full mx-auto">
        <div className="p-4 md:p-8">
          {/* Header Section */}
          <div className="mb-12">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h1 className="text-8xl md:text-9xl font-light text-white leading-none">
                  {content[0].count}
                </h1>
                <p className="text-lg text-gray-400 uppercase tracking-widest font-medium">
                  PIECES OF CONTENT TO EXPLORE
                </p>
              </div>
              <div className="text-right">
                <h2 className="text-xl text-gray-400 uppercase tracking-widest font-medium mb-4">
                  Explore Topics
                </h2>
                {selectedCategory && (
                  <p className="text-base text-gray-500">
                    Currently viewing: <span className="font-medium text-white">{selectedCategory}</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Categories Column */}
            <div className="md:col-span-4">
              <div className="space-y-8">
                {content.slice(1).map((item) => (
                  <div
                    key={item.title}
                    className={`
                      group cursor-pointer transition-all duration-300
                      ${selectedCategory === item.title ? 'opacity-100' : 'opacity-70 hover:opacity-100'}
                    `}
                    onClick={() => setSelectedCategory(
                      selectedCategory === item.title ? null : item.title
                    )}
                  >
                    <div className="flex items-start gap-6">
                      <div className={`
                        w-16 h-16 rounded-full border-2 flex items-center justify-center cursor-pointer
                        transition-all duration-300
                        ${selectedCategory === item.title 
                          ? 'bg-white text-black' 
                          : 'bg-transparent text-white group-hover:bg-white group-hover:text-black'
                        }
                      `}>
                        <p className="text-2xl font-light">
                          {item.count}
                        </p>
                      </div>
                      <div>
                        <h2 className="text-2xl font-light text-white mb-4">
                          {item.title}
                        </h2>
                        <div className="flex flex-wrap gap-2">
                          {item.topics?.map((topic) => (
                            <span
                              key={topic}
                              className={`
                                text-sm px-3 py-1.5 rounded-none border border-white
                                transition-colors
                                ${selectedCategory === item.title 
                                  ? 'bg-white text-black' 
                                  : 'text-gray-400 group-hover:bg-white group-hover:text-black'
                                }
                              `}
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Topics Column */}
            <div className="md:col-span-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {content.slice(1).map((category) => (
                  category.topics?.map((topic) => (
                    <div
                      key={topic}
                      className={`
                        p-6 border-2 border-white cursor-pointer
                        transition-all duration-300
                        ${selectedCategory && selectedCategory !== category.title 
                          ? 'opacity-30' 
                          : 'bg-transparent hover:bg-white/10'
                        }
                      `}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-light text-white mb-3">
                            {topic}
                          </h3>
                          <p className="text-sm font-medium text-gray-400">
                            {category.title}
                          </p>
                        </div>
                        <div className={`
                          w-10 h-10 rounded-full border-2 border-white flex items-center justify-center cursor-pointer
                          transition-colors duration-300
                          ${selectedCategory === category.title 
                            ? 'bg-white' 
                            : 'bg-transparent group-hover:bg-white/10'
                          }
                        `}>
                          <div className={`
                            w-2 h-2 rounded-full
                            ${selectedCategory === category.title 
                              ? 'bg-black' 
                              : 'bg-white'
                            }
                          `} />
                        </div>
                      </div>
                    </div>
                  ))
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentSpace; 