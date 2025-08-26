import React, { useState, useEffect } from 'react';
import { Search, X, Clock, ExternalLink, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SearchResult {
  id: string;
  type: 'experience' | 'project' | 'skill' | 'education';
  title: string;
  subtitle: string;
  description?: string;
  logo?: string;
  highlighted?: boolean;
}

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    experience: any[];
    projects: any[];
    skills: any[];
    education: any[];
  };
  onResultClick: (result: SearchResult) => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose, data, onResultClick }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'React', 'Software Engineer', 'AWS', 'Python'
  ]);

  const searchSuggestions = [
    'Software Engineer', 'React', 'Python', 'AWS', 'Node.js', 'TypeScript',
    'Machine Learning', 'Full Stack', 'Database', 'API', 'Frontend', 'Backend'
  ];

  const performSearch = (searchQuery: string): SearchResult[] => {
    if (!searchQuery.trim()) return [];

    const results: SearchResult[] = [];
    const lowerQuery = searchQuery.toLowerCase();

    // Search experience
    data.experience.forEach((exp) => {
      if (
        exp.title.toLowerCase().includes(lowerQuery) ||
        exp.artist.toLowerCase().includes(lowerQuery) ||
        exp.description?.toLowerCase().includes(lowerQuery) ||
        exp.bullets?.some((bullet: string) => bullet.toLowerCase().includes(lowerQuery))
      ) {
        results.push({
          id: exp.id,
          type: 'experience',
          title: exp.title,
          subtitle: exp.artist,
          description: exp.description,
          logo: exp.logo || '/placeholder.svg'
        });
      }
    });

    // Search projects
    data.projects.forEach((project) => {
      if (
        project.name.toLowerCase().includes(lowerQuery) ||
        project.description.toLowerCase().includes(lowerQuery) ||
        project.tech.toLowerCase().includes(lowerQuery) ||
        project.bullets?.some((bullet: string) => bullet.toLowerCase().includes(lowerQuery))
      ) {
        results.push({
          id: project.id,
          type: 'project',
          title: project.name,
          subtitle: project.description,
          description: project.tech,
          logo: project.logo || '/placeholder.svg'
        });
      }
    });

    // Search skills
    data.skills.forEach((skill) => {
      if (skill.name.toLowerCase().includes(lowerQuery) || skill.category.toLowerCase().includes(lowerQuery)) {
        results.push({
          id: skill.name,
          type: 'skill',
          title: skill.name,
          subtitle: skill.category,
          description: `${skill.proficiency}% proficiency`,
          logo: skill.logo || '/placeholder.svg'
        });
      }
    });

    return results.slice(0, 10); // Limit results
  };

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (query.trim()) {
        const searchResults = performSearch(query);
        setResults(searchResults);
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [query, data]);

  const handleSearch = (searchTerm: string) => {
    setQuery(searchTerm);
    if (!recentSearches.includes(searchTerm)) {
      setRecentSearches(prev => [searchTerm, ...prev.slice(0, 3)]);
    }
  };

  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === query.toLowerCase() ? 
        <span key={index} className="bg-primary/30 text-primary font-semibold">{part}</span> : 
        part
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-start justify-center pt-20">
      <div className="w-full max-w-2xl mx-4 bg-card rounded-lg shadow-2xl animate-scale-in">
        {/* Search Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search experience, skills, projects..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-primary"
                autoFocus
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="w-10 h-10"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Search Content */}
        <div className="max-h-96 overflow-y-auto custom-scrollbar">
          {!query ? (
            <div className="p-6 space-y-6">
              {/* Recent Searches */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Recent searches
                </h3>
                <div className="space-y-2">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(search)}
                      className="flex items-center gap-3 w-full p-2 hover:bg-accent rounded-lg text-left"
                    >
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{search}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Search Suggestions */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-3">
                  Try searching for
                </h3>
                <div className="flex flex-wrap gap-2">
                  {searchSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(suggestion)}
                      className="px-3 py-1 bg-muted hover:bg-accent rounded-full text-sm transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="p-4 space-y-2">
              {results.map((result) => (
                <button
                  key={`${result.type}-${result.id}`}
                  onClick={() => {
                    onResultClick(result);
                    onClose();
                  }}
                  className="w-full flex items-center gap-4 p-3 hover:bg-accent rounded-lg text-left transition-colors"
                >
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                    {result.type === 'experience' && <ExternalLink className="w-6 h-6 text-primary" />}
                    {result.type === 'project' && <div className="w-6 h-6 bg-primary rounded" />}
                    {result.type === 'skill' && <div className="w-6 h-6 bg-orange-500 rounded-full" />}
                    {result.type === 'education' && <div className="w-6 h-6 bg-blue-500 rounded" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">
                      {highlightText(result.title, query)}
                    </h4>
                    <p className="text-sm text-muted-foreground truncate">
                      {highlightText(result.subtitle, query)}
                    </p>
                    {result.description && (
                      <p className="text-xs text-muted-foreground truncate">
                        {highlightText(result.description, query)}
                      </p>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground capitalize">
                    {result.type}
                  </div>
                </button>
              ))}
            </div>
          ) : query ? (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No results found for "{query}"</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or browse the categories below
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {['Experience', 'Projects', 'Skills', 'Education'].map((category) => (
                  <button
                    key={category}
                    onClick={() => handleSearch(category)}
                    className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;