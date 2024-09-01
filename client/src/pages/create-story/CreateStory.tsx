import React, { useState, useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Alert, AlertDescription } from "../../components/ui/alert";
import { Story } from "../../types/Story";
import { createStory } from '../../services/storyAPI';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { IconBold, IconItalic, IconList, IconListNumbers, IconH2, IconDeviceFloppy, IconArrowLeft } from '@tabler/icons-react';
import { sanitizeHtml } from '../../utils/htmlSanitizer';
import { ThemeRoom } from '../../types/ThemeRoom';

const CreateStory: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [storyTitle, setStoryTitle] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const prevStoryId = location.state?.prevStoryId;
  const themeRoom = location.state?.themeRoom;
  const rootNode = location.state?.rootNode;

  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p></p>',
  });

  const processContent = (content: string): string => {
    const sanitizedContent = sanitizeHtml(content);
    return sanitizedContent.replace(/<\/p><p>/g, '</p><br><p>');
  };

  const handleGoBackToThemeRoom = () => {
    navigate(`/story-map/${themeRoom._id}`);
  };

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const newStory: Partial<Story> = {
        title: storyTitle,
        content: processContent(editor?.getHTML() || ''),
        type: rootNode ? 'root' : 'child',
        themeRoomId: themeRoom._id,
        prev: prevStoryId ? [prevStoryId] : [],
        authorId: '66a8449eb7c52cb3dec16071',
      };
      await createStory(newStory);
      handleGoBackToThemeRoom();
    } catch (err) {
      console.error('Error creating story:', err);
      setError('Failed to create story. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [storyTitle, editor, rootNode, themeRoom._id, prevStoryId, navigate, handleGoBackToThemeRoom]);

  return (
    <div className="min-h-screen bg-background pt-24">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-[1fr_300px]">
        <MainContent
          storyTitle={storyTitle}
          setStoryTitle={setStoryTitle}
          editor={editor}
          isLoading={isLoading}
          error={error}
          handleGoBackToThemeRoom={handleGoBackToThemeRoom}
          navigate={navigate}
        />
        <Sidebar themeRoom={themeRoom} />
      </form>
    </div>
  );
};

const MainContent: React.FC<{
  storyTitle: string;
  setStoryTitle: (title: string) => void;
  editor: any;
  isLoading: boolean;
  error: string | null;
  handleGoBackToThemeRoom: () => void;
  navigate: (to: number) => void;
}> = ({ storyTitle, setStoryTitle, editor, isLoading, error, handleGoBackToThemeRoom, navigate }) => (
  <div className="flex flex-col border-r">
    <Header
      storyTitle={storyTitle}
      setStoryTitle={setStoryTitle}
      isLoading={isLoading}
      handleGoBackToThemeRoom={handleGoBackToThemeRoom}
    />
    <main className="flex-1 overflow-auto p-6">
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} className="mt-4 prose dark:prose-invert max-w-none h-[calc(100vh-280px)] overflow-y-auto focus:outline-none" />
      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <ActionButtons isLoading={isLoading} navigate={navigate} />
    </main>
  </div>
);

const Header: React.FC<{
  storyTitle: string;
  setStoryTitle: (title: string) => void;
  isLoading: boolean;
  handleGoBackToThemeRoom: () => void;
}> = ({ storyTitle, setStoryTitle, isLoading, handleGoBackToThemeRoom }) => (
  <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
    <Button
      type="button"
      variant="custom"
      size="icon"
      onClick={handleGoBackToThemeRoom}
      className="mr-2"
    >
      <IconArrowLeft className="h-5 w-5" />
      <span className="sr-only">Go back to theme room</span>
    </Button>
    <Input
      type="text"
      placeholder="Untitled"
      value={storyTitle}
      onChange={(e) => setStoryTitle(e.target.value)}
      className="h-10 flex-1 bg-transparent text-lg font-medium focus:outline-none"
    />
    <Button type="submit" variant="custom" size="icon" disabled={isLoading}>
      <IconDeviceFloppy className="h-5 w-5" />
      <span className="sr-only">Save</span>
    </Button>
  </header>
);

const EditorToolbar: React.FC<{ editor: any }> = ({ editor }) => (
  <div className="flex items-center space-x-2 border-b pb-4">
    <ToolbarButton
      onClick={() => editor?.chain().focus().toggleBold().run()}
      isActive={editor?.isActive('bold')}
      icon={<IconBold className="h-5 w-5" />}
    />
    <ToolbarButton
      onClick={() => editor?.chain().focus().toggleItalic().run()}
      isActive={editor?.isActive('italic')}
      icon={<IconItalic className="h-5 w-5" />}
    />
    <ToolbarButton
      onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
      isActive={editor?.isActive('heading', { level: 2 })}
      icon={<IconH2 className="h-5 w-5" />}
    />
    <ToolbarButton
      onClick={() => editor?.chain().focus().toggleBulletList().run()}
      isActive={editor?.isActive('bulletList')}
      icon={<IconList className="h-5 w-5" />}
    />
    <ToolbarButton
      onClick={() => editor?.chain().focus().toggleOrderedList().run()}
      isActive={editor?.isActive('orderedList')}
      icon={<IconListNumbers className="h-5 w-5" />}
    />
  </div>
);

const ToolbarButton: React.FC<{ onClick: () => void; isActive: boolean; icon: React.ReactNode }> = ({ onClick, isActive, icon }) => (
  <Button
    type="button"
    variant="custom"
    size="sm"
    onClick={onClick}
    className={`p-2 ${isActive ? 'bg-neutral-50 dark:bg-neutral-950 border' : ''}`}
  >
    {icon}
  </Button>
);

const ActionButtons: React.FC<{ isLoading: boolean; navigate: (to: number) => void }> = ({ isLoading, navigate }) => (
  <div className="flex justify-end space-x-4 mt-6">
    <Button type="button" variant="outline" onClick={() => navigate(-1)}>
      Cancel
    </Button>
    <Button type="submit" disabled={isLoading}>
      {isLoading ? 'Publishing...' : 'Publish'}
    </Button>
  </div>
);

const Sidebar: React.FC<{ themeRoom: ThemeRoom }> = ({ themeRoom }) => (
  <aside className="hidden lg:block border-l">
    <div className="sticky top-0 overflow-y-auto h-screen">
      <div className="p-6 border-b">
        <h2 className="text-lg font-medium mb-4">Theme Room Details</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold mb-1">Name</h3>
            <p className="text-sm text-muted-foreground">{themeRoom.name}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-1">Description</h3>
            <p className="text-sm text-muted-foreground">{themeRoom.description}</p>
          </div>
          {themeRoom.tags && themeRoom.tags.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {themeRoom.tags.map((tag: string, index: number) => (
                  <span key={index} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="p-6">
        <h2 className="text-lg font-medium mb-4">Related</h2>
        <div className="space-y-4">
          {/* Add related content or template cards here */}
        </div>
      </div>
    </div>
  </aside>
);

export default CreateStory; 