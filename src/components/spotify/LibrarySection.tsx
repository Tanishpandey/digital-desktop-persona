import React, { useState } from 'react';
import { Library, Clock, Calendar, Heart, Grid3X3, List, Search, Plus, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { resumeData } from '@/data/resumeData';

interface LibrarySectionProps {
  onItemSelect: (item: any, type: string) => void;
}

const LibrarySection: React.FC<LibrarySectionProps> = ({ onItemSelect }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const libraryCategories = [
    { id: 'all', name: 'All', count: resumeData.experience.length + resumeData.projects.length },
    { id: 'experience', name: 'Experience', count: resumeData.experience.length },
    { id: 'projects', name: 'Projects', count: resumeData.projects.length },
    { id: 'favorites', name: 'Liked', count: resumeData.favorites.topProjects.length + resumeData.experience.filter(e => e.isLiked).length },
    { id: 'recent', name: 'Recently Added', count: 3 }
  ];

  const madeForYouPlaylists = [
    {
      id: 'fullstack',
      name: 'Full Stack Playlist',
      description: 'Complete end-to-end projects',
      count: resumeData.projects.length,
      gradient: 'from-purple-500 to-blue-500'
    },
    {
      id: 'frontend',
      name: 'Frontend Favorites',
      description: 'Best UI/UX implementations',
      count: resumeData.projects.filter(p => p.tech.includes('React')).length,
      gradient: 'from-green-500 to-teal-500'
    },
    {
      id: 'backend',
      name: 'Backend Bangers',
      description: 'Server-side excellence',
      count: resumeData.projects.filter(p => p.tech.includes('Node')).length,
      gradient: 'from-orange-500 to-red-500'
    },
    {
      id: 'mobile',
      name: 'Mobile Mix',
      description: 'Cross-platform applications',
      count: 2,
      gradient: 'from-pink-500 to-purple-500'
    }
  ];

  const getFilteredItems = () => {
    let items: any[] = [];

    if (activeFilter === 'all' || activeFilter === 'experience') {
      items.push(...resumeData.experience.map(exp => ({ ...exp, type: 'experience' })));
    }
    
    if (activeFilter === 'all' || activeFilter === 'projects') {
      items.push(...resumeData.projects.map(proj => ({ ...proj, type: 'project' })));
    }

    if (activeFilter === 'favorites') {
      items = [
        ...resumeData.experience.filter(exp => exp.isLiked).map(exp => ({ ...exp, type: 'experience' })),
        ...resumeData.projects.filter(proj => proj.isFavorited).map(proj => ({ ...proj, type: 'project' }))
      ];
    }

    if (activeFilter === 'recent') {
      items = [...items].slice(0, 3);
    }

    if (searchQuery) {
      items = items.filter(item => 
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.artist?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return items;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
          <Library className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Your Library</h1>
          <p className="text-muted-foreground">Your complete professional portfolio</p>
        </div>
      </div>

      {/* Made For You Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Made for You</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {madeForYouPlaylists.map((playlist) => (
            <div
              key={playlist.id}
              className="spotify-card group p-4 rounded-lg cursor-pointer"
              onClick={() => onItemSelect(playlist, 'playlist')}
            >
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 bg-gradient-to-br ${playlist.gradient} rounded-lg flex items-center justify-center`}>
                  <div className="w-8 h-8 bg-white/20 rounded"></div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{playlist.name}</h3>
                  <p className="text-sm text-muted-foreground">{playlist.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{playlist.count} items</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {libraryCategories.map((category) => (
            <Button
              key={category.id}
              variant={activeFilter === category.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter(category.id)}
              className="stagger-item"
            >
              {category.name}
              <span className="ml-1 text-xs opacity-70">({category.count})</span>
            </Button>
          ))}
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search in library..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-64"
            />
          </div>
          
          <div className="flex">
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Items Display */}
      <div className="space-y-4">
        {viewMode === 'list' ? (
          // List View
          <div className="space-y-2">
            <div className="grid grid-cols-[50px_2fr_1fr_1fr_50px] gap-4 px-4 py-2 text-sm text-muted-foreground border-b">
              <span>#</span>
              <span>Title</span>
              <span>Type</span>
              <span>Duration</span>
              <Heart className="w-4 h-4" />
            </div>
            
            {getFilteredItems().map((item, index) => (
              <div
                key={item.id}
                className="spotify-card group grid grid-cols-[50px_2fr_1fr_1fr_50px] gap-4 p-4 rounded-lg cursor-pointer stagger-item"
                onClick={() => onItemSelect(item, item.type)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="flex items-center text-muted-foreground">{index + 1}</span>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-muted rounded flex items-center justify-center">
                    {item.logo ? (
                      <img src={item.logo} alt="" className="w-6 h-6 object-cover rounded" />
                    ) : (
                      <div className="w-6 h-6 bg-primary/30 rounded"></div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{item.title || item.name}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {item.artist || item.description}
                    </p>
                  </div>
                </div>
                <span className="flex items-center text-muted-foreground capitalize">{item.type}</span>
                <span className="flex items-center text-muted-foreground">
                  {item.duration || item.album || 'Ongoing'}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Heart className={`w-4 h-4 ${
                    (item.isLiked || item.isFavorited) ? 'fill-primary text-primary' : 'text-muted-foreground'
                  }`} />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          // Grid View
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {getFilteredItems().map((item, index) => (
              <div
                key={item.id}
                className="spotify-card group rounded-lg p-4 cursor-pointer stagger-item"
                onClick={() => onItemSelect(item, item.type)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-full aspect-square bg-muted rounded-lg mb-3 relative overflow-hidden glow-effect">
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    {item.logo ? (
                      <img src={item.logo} alt="" className="w-12 h-12 object-cover" />
                    ) : (
                      <div className="w-12 h-12 bg-primary/30 rounded"></div>
                    )}
                  </div>
                  <div className="play-overlay absolute bottom-2 right-2">
                    <Button className="play-button w-10 h-10 rounded-full p-0">
                      <span className="w-4 h-4 bg-white rounded-full"></span>
                    </Button>
                  </div>
                </div>
                <h3 className="font-medium mb-1 truncate">{item.title || item.name}</h3>
                <p className="text-sm text-muted-foreground truncate">
                  {item.artist || item.description}
                </p>
                <p className="text-xs text-muted-foreground mt-1 capitalize">{item.type}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Empty State */}
      {getFilteredItems().length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-12 h-12 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No items found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery ? 'Try adjusting your search terms' : 'This category is empty'}
          </p>
        </div>
      )}
    </div>
  );
};

export default LibrarySection;