import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeRoom } from "../../types/ThemeRoom";
import { getAllThemeRooms } from "../../services/themeRoomAPI";
import LoadingScreen from "../../components/layout/LoadingScreen";
import { capitalize } from "../../utils/capitalize";
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { IconSearch, IconHeart, IconLayoutGrid, IconList } from '@tabler/icons-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";

const Home = () => {
  const [themeRooms, setThemeRooms] = useState<ThemeRoom[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [layoutView, setLayoutView] = useState('grid');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchThemeRooms = async () => {
      try {
        setIsLoading(true);
        const response = await getAllThemeRooms();
        setThemeRooms(response);
      } catch (error) {
        setError(error as string);
      } finally {
        setIsLoading(false);
      }
    }
    fetchThemeRooms();
  }, []);

  const toggleLayout = () => {
    setLayoutView(prevLayout => prevLayout === 'grid' ? 'list' : 'grid');
  }

  if (isLoading) return <LoadingScreen />;
  if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;

  const filteredRooms = themeRooms.filter(room =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleRoomClick = (room: ThemeRoom) => {
    navigate(`/story-map/${room._id}`, { state: { themeRoom: room } });
  };

  return (
    <div className="flex-grow p-4 md:p-8 overflow-y-auto min-h-screen">
      <div className="max-w-7xl mx-auto">
        <Header />
        <SearchAndFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          layoutView={layoutView}
          toggleLayout={toggleLayout}
        />
        <ThemeRoomGrid
          rooms={filteredRooms}
          handleRoomClick={handleRoomClick}
          layoutView={layoutView}
        />
      </div>
    </div>  
  );
}

const Header = () => (
  <div className="flex justify-between items-center mb-6 md:mb-8 pt-16 sm:pt-24">
    <h1 className="text-3xl md:text-4xl font-bold">Theme Rooms</h1>
  </div>
);

const SearchAndFilterBar = ({ searchTerm, setSearchTerm, layoutView, toggleLayout }) => (
  <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-2 bg-background space-y-4 md:space-y-0 md:space-x-4 rounded-lg mb-6">
    <div className="relative flex-1 w-full md:w-auto">
      <IconSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search Theme Rooms..."
        className="pl-8 w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
    <div className="layout">
      <Button className='border border-border text-foreground bg-neutral-50 dark:bg-neutral-950 hover:bg-neutral-100 dark:hover:bg-neutral-900' onClick={toggleLayout}>
        {layoutView === 'grid' ? <IconLayoutGrid /> : <IconList />}
      </Button>
    </div>
  </div>
);

const ThemeRoomGrid = ({ rooms, handleRoomClick, layoutView }) => (
  <div className={`grid gap-6 ${layoutView === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
    {rooms.map((room) => (
      <ThemeRoomCard key={room._id} room={room} onClick={() => handleRoomClick(room)} layoutView={layoutView} />
    ))}
  </div>
);

const ThemeRoomCard = ({ room, onClick, layoutView }) => (
  <Card
    className={`h-full flex ${layoutView === 'list' ? 'flex-row items-center' : 'flex-col'} transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 cursor-pointer relative`}
    onClick={onClick}
  >
    <CardHeader className={`relative ${layoutView === 'list' ? 'flex-shrink-0 w-1/4 self-stretch flex flex-col justify-center' : ''}`}>
      <CardTitle className={layoutView === 'list' ? 'text-center' : ''}>{room.name}</CardTitle>
    </CardHeader>
    <CardContent className={`flex-grow ${layoutView === 'list' ? 'w-1/2 flex items-center p-4' : ''}`}>
      <p className="text-sm text-muted-foreground text-left">{room.description}</p>
    </CardContent>
    <CardFooter className={`${layoutView === 'list' ? 'w-1/4 self-stretch flex flex-col justify-center p-0 mr-5' : ''}`}>
      <TagList tags={room.tags} />
    </CardFooter>
    <FavoriteButton layoutView={layoutView} />
  </Card>
);

const FavoriteButton = ({ layoutView }) => (
  <Button
    size="icon"
    className={`absolute bg-transparent hover:bg-transparent text-muted-foreground ${
      layoutView === 'list' ? 'top-1/2 -translate-y-1/2 right-2' : 'top-2 right-2'
    }`}
    onClick={(e) => {
      e.stopPropagation();
      // add logic here
    }}
  >
    <IconHeart className="h-5 w-5" />
  </Button>
);

const TagList = ({ tags }) => (
  <div className="flex flex-wrap gap-2">
    {tags.map((tag, index) => (
      <Badge key={index} variant="secondary">
        {capitalize(tag)}
      </Badge>
    ))}
  </div>
);

export default Home;