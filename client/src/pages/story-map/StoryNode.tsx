import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Handle, Position } from '@xyflow/react';
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
    IconChevronRight,
    IconCheck,
    IconBookmark,
    IconPlus,
    IconDotsVertical,
    IconEdit,
    IconTrash,
    IconFlag
} from '@tabler/icons-react';
import { Story } from '../../types/Story';
import { ThemeRoom } from '../../types/ThemeRoom';
import { sanitizeHtml } from '../../utils/htmlSanitizer';
import { deleteStory } from '../../services/storyAPI';
import { useToast } from "../../components/ui/use-toast";

interface StoryNodeProps {
    data: Story & { themeRoom: ThemeRoom };
}

const StoryNode: React.FC<StoryNodeProps> = ({ data}) => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleStoryClick = () => {
        navigate(`/story`, { state: { ...data, themeRoom: data.themeRoom } });
    };

    const handleCreateStoryClick = () => {
        navigate(`/create-story`, { state: { prevStoryId: data._id, themeRoom: data.themeRoom } });
    };

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const handleEdit = () => {
        // Implement edit functionality
        console.log('Edit story:', data._id);
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await deleteStory(data._id);
            toast({
                title: "Success",
                description: "Story successfully deleted",
                variant: "default",
            });
            // onDelete(data._id);
        } catch (error) {
            if (error.response && error.response.status === 422) {
                toast({
                    title: "Error",
                    description: "Cannot delete stories with next links",
                    variant: "destructive",
                });
            } else if (error.response && error.response.status === 404) {
                toast({
                    title: "Error",
                    description: "Story not found",
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "Error",
                    description: "An unexpected error occurred",
                    variant: "destructive",
                });
            }
            console.error('Error deleting story:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    const handleReport = () => {
        // Implement report functionality
        console.log('Report story:', data._id);
    };

    return (
        <div className="relative w-full max-w-md">
            <Handle
                type="target"
                position={Position.Top}
                className={`w-3 h-3 ${data.prev.length > 0 ? 'bg-primary' : 'bg-transparent border-none'}`}
                style={{ top: -8, left: '50%', transform: 'translateX(-50%)' }}
            />
            <Card className="p-6 bg-background text-foreground shadow-lg rounded-xl border border-border">
                <div className="space-y-4">
                    <div>
                        <h3 className="text-xl font-semibold">{data.title}</h3>
                        <div className="text-muted-foreground text-sm">
                            <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(data.content.substring(0, 50) + "...") }} />
                        </div>
                    </div>
                    <div className="flex items-center justify-between text-muted-foreground text-sm">
                        <div className="flex items-center gap-2">
                            <p>Anonymous</p>
                        </div>
                        <span>{formatDate(data.createdAt)}</span>
                    </div>
                    <div className='flex justify-between items-center'>
                        <div className="read-more-btn">
                            <Button
                                onClick={handleStoryClick}
                                variant="custom2"
                            >
                                Read More
                                <IconChevronRight className="ml-1 w-4 h-4" />
                            </Button>
                        </div>
                        <div className="action-btns">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="custom2" className='p-1'>
                                        <IconDotsVertical className="w-4 h-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={handleEdit}>
                                        <IconEdit className="mr-2 h-4 w-4" />
                                        <span>Edit</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={handleDelete} disabled={isDeleting}>
                                        <IconTrash className="mr-2 h-4 w-4" />
                                        <span>Delete</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={handleReport}>
                                        <IconFlag className="mr-2 h-4 w-4" />
                                        <span>Report</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
                <div className="absolute -top-3 -right-3 flex space-x-2">
                    <button className="p-1.5 rounded-full bg-neutral-100 dark:bg-neutral-900 shadow-sm hover:shadow-md transition-all duration-200 border border-border">
                        <IconCheck className="w-4 h-4 text-green-500" />
                    </button>
                    <button className="p-1.5 rounded-full bg-neutral-100 dark:bg-neutral-900 shadow-sm hover:shadow-md transition-all duration-200 border border-border ">
                        <IconBookmark className="w-4 h-4 text-blue-500" />
                    </button>
                    <button
                        onClick={handleCreateStoryClick}
                        className="p-1.5 rounded-full bg-neutral-100 dark:bg-neutral-900 shadow-sm hover:shadow-md transition-all duration-200 border border-border"
                    >
                        <IconPlus className="w-4 h-4 text-purple-500" />
                    </button>

                </div>
            </Card>
            <Handle
                type="source"
                position={Position.Bottom}
                className={`w-3 h-3 ${data.next.length > 0 ? 'bg-primary' : 'bg-transparent border-none'}`}
                style={{ bottom: -8, left: '50%', transform: 'translateX(-50%)' }}
            />
        </div>
    );
};

export default StoryNode;