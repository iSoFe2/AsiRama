import React from "react";
import { 
  Card, 
  CardBody, 
  Input, 
  Textarea, 
  Button, 
  Select, 
  SelectItem, 
  Chip,
  Tabs,
  Tab,
  Divider
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { Link, useParams } from "react-router-dom";
import { getMovieById } from "../../data/movies";

export function ContentForm() {
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;
  
  const [contentType, setContentType] = React.useState<"movie" | "series">("movie");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [year, setYear] = React.useState<number>(new Date().getFullYear());
  const [duration, setDuration] = React.useState("");
  const [rating, setRating] = React.useState<number>(0);
  const [posterImage, setPosterImage] = React.useState("");
  const [backdropImage, setBackdropImage] = React.useState("");
  const [videoUrl, setVideoUrl] = React.useState("");
  const [genres, setGenres] = React.useState<string[]>([]);
  const [isFeatured, setIsFeatured] = React.useState(false);
  
  // For series
  const [seasons, setSeasons] = React.useState<{
    id: string;
    name: string;
    episodes: {
      id: string;
      title: string;
      description: string;
      thumbnailUrl: string;
      videoUrl: string;
      duration: string;
      episodeNumber: number;
    }[]
  }[]>([]);
  
  React.useEffect(() => {
    if (isEditing && id) {
      const movie = getMovieById(id);
      if (movie) {
        setContentType(movie.type);
        setTitle(movie.title);
        setDescription(movie.description);
        setYear(movie.year);
        setDuration(movie.duration);
        setRating(movie.rating);
        setPosterImage(movie.posterImage);
        setBackdropImage(movie.backdropImage);
        setVideoUrl(movie.videoUrl);
        setGenres(movie.genre);
        setIsFeatured(movie.isFeatured || false);
        
        if (movie.type === "series" && movie.seasons) {
          setSeasons(movie.seasons);
        }
      }
    }
  }, [id, isEditing]);
  
  const handleAddSeason = () => {
    const newSeasonId = `s${seasons.length + 1}`;
    setSeasons([
      ...seasons,
      {
        id: newSeasonId,
        name: `Season ${seasons.length + 1}`,
        episodes: []
      }
    ]);
  };
  
  const handleAddEpisode = (seasonIndex: number) => {
    const updatedSeasons = [...seasons];
    const newEpisodeNumber = updatedSeasons[seasonIndex].episodes.length + 1;
    
    updatedSeasons[seasonIndex].episodes.push({
      id: `${updatedSeasons[seasonIndex].id}e${newEpisodeNumber}`,
      title: `Episode ${newEpisodeNumber}`,
      description: "",
      thumbnailUrl: "",
      videoUrl: "",
      duration: "",
      episodeNumber: newEpisodeNumber
    });
    
    setSeasons(updatedSeasons);
  };
  
  const handleRemoveEpisode = (seasonIndex: number, episodeIndex: number) => {
    const updatedSeasons = [...seasons];
    updatedSeasons[seasonIndex].episodes.splice(episodeIndex, 1);
    
    // Update episode numbers
    updatedSeasons[seasonIndex].episodes.forEach((episode, idx) => {
      episode.episodeNumber = idx + 1;
    });
    
    setSeasons(updatedSeasons);
  };
  
  const handleRemoveSeason = (seasonIndex: number) => {
    const updatedSeasons = [...seasons];
    updatedSeasons.splice(seasonIndex, 1);
    
    // Update season names and IDs
    updatedSeasons.forEach((season, idx) => {
      season.id = `s${idx + 1}`;
      season.name = `Season ${idx + 1}`;
    });
    
    setSeasons(updatedSeasons);
  };
  
  const handleUpdateEpisode = (seasonIndex: number, episodeIndex: number, field: string, value: string) => {
    const updatedSeasons = [...seasons];
    (updatedSeasons[seasonIndex].episodes[episodeIndex] as any)[field] = value;
    setSeasons(updatedSeasons);
  };
  
  const handleAddGenre = (genre: string) => {
    if (genre && !genres.includes(genre)) {
      setGenres([...genres, genre]);
    }
  };
  
  const handleRemoveGenre = (genre: string) => {
    setGenres(genres.filter(g => g !== genre));
  };
  
  const availableGenres = [
    "Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary", 
    "Drama", "Fantasy", "Horror", "Mystery", "Romance", "Sci-Fi", 
    "Thriller", "War", "Western"
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send the data to your backend
    const contentData = {
      id: isEditing ? id : Date.now().toString(),
      title,
      description,
      posterImage,
      backdropImage,
      videoUrl,
      year,
      duration,
      genre: genres,
      rating,
      isFeatured,
      type: contentType,
      ...(contentType === "series" && { seasons })
    };
    
    console.log("Submitting content:", contentData);
    
    // Redirect to content management page after submission
    // navigate("/admin/content");
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-16 pb-16 md:pb-0">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">
              {isEditing ? "Edit Content" : "Add New Content"}
            </h1>
            <p className="text-gray-400">
              {isEditing ? "Update existing content details" : "Add a new movie or TV show to your platform"}
            </p>
          </div>
          <Button 
            as={Link}
            to="/admin/content"
            variant="bordered" 
            color="default"
            startContent={<Icon icon="lucide:arrow-left" />}
          >
            Back to Content
          </Button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <Card className="bg-gray-800 border-none mb-6">
            <CardBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <Select 
                    label="Content Type" 
                    value={contentType}
                    onChange={(e) => setContentType(e.target.value as "movie" | "series")}
                    className="mb-4"
                  >
                    <SelectItem key="movie" value="movie">Movie</SelectItem>
                    <SelectItem key="series" value="series">TV Show</SelectItem>
                  </Select>
                </div>
                
                <div className="md:col-span-2">
                  <Input 
                    label="Title" 
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mb-4"
                    isRequired
                  />
                </div>
                
                <div className="md:col-span-2">
                  <Textarea 
                    label="Description" 
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mb-4"
                    minRows={3}
                    isRequired
                  />
                </div>
                
                <Input 
                  type="number" 
                  label="Year" 
                  placeholder="Enter release year"
                  value={year.toString()}
                  onChange={(e) => setYear(parseInt(e.target.value))}
                  className="mb-4"
                  isRequired
                />
                
                <Input 
                  label="Duration" 
                  placeholder="e.g. 2h 30m"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="mb-4"
                  isRequired
                />
                
                <Input 
                  type="number" 
                  label="Rating" 
                  placeholder="Enter rating (0-10)"
                  value={rating.toString()}
                  onChange={(e) => setRating(parseFloat(e.target.value))}
                  min={0}
                  max={10}
                  step={0.1}
                  className="mb-4"
                  isRequired
                />
                
                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="featured" 
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <label htmlFor="featured" className="text-white">Featured Content</label>
                </div>
                
                <div className="md:col-span-2">
                  <Input 
                    label="Poster Image URL" 
                    placeholder="Enter poster image URL"
                    value={posterImage}
                    onChange={(e) => setPosterImage(e.target.value)}
                    className="mb-4"
                    isRequired
                  />
                </div>
                
                <div className="md:col-span-2">
                  <Input 
                    label="Backdrop Image URL" 
                    placeholder="Enter backdrop image URL"
                    value={backdropImage}
                    onChange={(e) => setBackdropImage(e.target.value)}
                    className="mb-4"
                    isRequired
                  />
                </div>
                
                {contentType === "movie" && (
                  <div className="md:col-span-2">
                    <Input 
                      label="Video URL" 
                      placeholder="Enter video URL"
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      className="mb-4"
                      isRequired
                    />
                  </div>
                )}
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-white mb-2">Genres</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {genres.map((genre) => (
                      <Chip 
                        key={genre} 
                        onClose={() => handleRemoveGenre(genre)}
                        variant="flat"
                      >
                        {genre}
                      </Chip>
                    ))}
                  </div>
                  <Select 
                    placeholder="Select genres"
                    onChange={(e) => handleAddGenre(e.target.value)}
                  >
                    {availableGenres.filter(g => !genres.includes(g)).map((genre) => (
                      <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                    ))}
                  </Select>
                </div>
              </div>
            </CardBody>
          </Card>
          
          {/* TV Show Seasons and Episodes */}
          {contentType === "series" && (
            <Card className="bg-gray-800 border-none mb-6">
              <CardBody>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-white">Seasons & Episodes</h2>
                  <Button 
                    color="primary" 
                    size="sm"
                    startContent={<Icon icon="lucide:plus" />}
                    onClick={handleAddSeason}
                  >
                    Add Season
                  </Button>
                </div>
                
                {seasons.length === 0 ? (
                  <div className="text-center py-8">
                    <Icon icon="lucide:film" className="text-gray-500 text-4xl mx-auto mb-2" />
                    <p className="text-gray-400">No seasons added yet</p>
                    <Button 
                      color="primary" 
                      variant="flat"
                      size="sm"
                      className="mt-4"
                      startContent={<Icon icon="lucide:plus" />}
                      onClick={handleAddSeason}
                    >
                      Add First Season
                    </Button>
                  </div>
                ) : (
                  <Tabs>
                    {seasons.map((season, seasonIndex) => (
                      <Tab key={season.id} title={season.name}>
                        <div className="py-4">
                          <div className="flex justify-between items-center mb-4">
                            <Input 
                              label="Season Name" 
                              value={season.name}
                              onChange={(e) => {
                                const updatedSeasons = [...seasons];
                                updatedSeasons[seasonIndex].name = e.target.value;
                                setSeasons(updatedSeasons);
                              }}
                              className="max-w-xs"
                            />
                            <div className="flex gap-2">
                              <Button 
                                color="primary" 
                                size="sm"
                                startContent={<Icon icon="lucide:plus" />}
                                onClick={() => handleAddEpisode(seasonIndex)}
                              >
                                Add Episode
                              </Button>
                              <Button 
                                color="danger" 
                                variant="light"
                                size="sm"
                                startContent={<Icon icon="lucide:trash" />}
                                onClick={() => handleRemoveSeason(seasonIndex)}
                              >
                                Remove Season
                              </Button>
                            </div>
                          </div>
                          
                          {season.episodes.length === 0 ? (
                            <div className="text-center py-8 border border-dashed border-gray-700 rounded-lg">
                              <Icon icon="lucide:video" className="text-gray-500 text-4xl mx-auto mb-2" />
                              <p className="text-gray-400">No episodes added yet</p>
                              <Button 
                                color="primary" 
                                variant="flat"
                                size="sm"
                                className="mt-4"
                                startContent={<Icon icon="lucide:plus" />}
                                onClick={() => handleAddEpisode(seasonIndex)}
                              >
                                Add First Episode
                              </Button>
                            </div>
                          ) : (
                            <div className="space-y-6">
                              {season.episodes.map((episode, episodeIndex) => (
                                <div key={episode.id} className="border border-gray-700 rounded-lg p-4">
                                  <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-medium text-white">
                                      Episode {episode.episodeNumber}
                                    </h3>
                                    <Button 
                                      color="danger" 
                                      variant="light"
                                      size="sm"
                                      isIconOnly
                                      onClick={() => handleRemoveEpisode(seasonIndex, episodeIndex)}
                                    >
                                      <Icon icon="lucide:trash" />
                                    </Button>
                                  </div>
                                  
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input 
                                      label="Episode Title" 
                                      value={episode.title}
                                      onChange={(e) => handleUpdateEpisode(seasonIndex, episodeIndex, "title", e.target.value)}
                                    />
                                    
                                    <Input 
                                      label="Duration" 
                                      value={episode.duration}
                                      onChange={(e) => handleUpdateEpisode(seasonIndex, episodeIndex, "duration", e.target.value)}
                                      placeholder="e.g. 45m"
                                    />
                                    
                                    <div className="md:col-span-2">
                                      <Textarea 
                                        label="Description" 
                                        value={episode.description}
                                        onChange={(e) => handleUpdateEpisode(seasonIndex, episodeIndex, "description", e.target.value)}
                                        minRows={2}
                                      />
                                    </div>
                                    
                                    <div className="md:col-span-2">
                                      <Input 
                                        label="Thumbnail URL" 
                                        value={episode.thumbnailUrl}
                                        onChange={(e) => handleUpdateEpisode(seasonIndex, episodeIndex, "thumbnailUrl", e.target.value)}
                                      />
                                    </div>
                                    
                                    <div className="md:col-span-2">
                                      <Input 
                                        label="Video URL" 
                                        value={episode.videoUrl}
                                        onChange={(e) => handleUpdateEpisode(seasonIndex, episodeIndex, "videoUrl", e.target.value)}
                                      />
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </Tab>
                    ))}
                  </Tabs>
                )}
              </CardBody>
            </Card>
          )}
          
          {/* Preview */}
          {(posterImage || backdropImage) && (
            <Card className="bg-gray-800 border-none mb-6">
              <CardBody>
                <h2 className="text-xl font-bold text-white mb-4">Preview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {posterImage && (
                    <div>
                      <h3 className="text-white mb-2">Poster Image</h3>
                      <div className="aspect-[2/3] rounded-lg overflow-hidden">
                        <img style="width: 100%; height: 500px; object-fit: cover;" 
                          src={posterImage} 
                          alt="Poster Preview" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                  
                  {backdropImage && (
                    <div>
                      <h3 className="text-white mb-2">Backdrop Image</h3>
                      <div className="aspect-video rounded-lg overflow-hidden">
                        <img 
                          src={backdropImage} 
                          alt="Backdrop Preview" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
          )}
          
          <div className="flex justify-end gap-3">
            <Button 
              as={Link}
              to="/admin/content"
              variant="flat" 
              color="default"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              color="danger"
              startContent={<Icon icon="lucide:save" />}
            >
              {isEditing ? "Update Content" : "Save Content"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

import { getAuth } from "firebase/auth";

const auth = getAuth();

function checkAdminAccess(user) {
    if (!user || user.role !== "admin") {
        alert("ليس لديك صلاحيات الوصول إلى لوحة الإدارة!");
        window.location.href = "/";
    }
}

auth.onAuthStateChanged((user) => {
    checkAdminAccess(user);
});
