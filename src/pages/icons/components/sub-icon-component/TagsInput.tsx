import { Chip, Input } from '@nextui-org/react';
import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { PressEvent } from '@react-aria/interactions';

interface TagsInputProps {
    tags: string[];
    setTags: (tags: string[]) => void;
    onBlur: () => void;
}

const TagsInput: React.FC<TagsInputProps> = ({ tags, setTags, onBlur }) => {
    //** Current Input Value State */
    const [inputValue, setInputValue] = useState<string>('');

    //** Handle Change in input field */
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    //** Handle keydown events in the input field */
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue.trim()) {
            if (!tags.includes(inputValue.trim())) {
                setTags([...tags, inputValue.trim()]);
            }
            setInputValue('');
            e.preventDefault();
        } else if (e.key === 'Backspace' && !inputValue) {
            if (tags.length > 0) {
                const updatedTags = tags.slice(0, tags.length - 1);
                setTags(updatedTags);
            }
        }
    };

    //** Handle removing a tag */
    const handleTagRemove = (index: number) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    //** Handle click event on the remove tag button */
    const handleTagClick = (index: number) => (_: PressEvent) => {
        handleTagRemove(index);
    };

    //** Handle blur event on the input field */
    const handleBlur = () => {
        onBlur();
    };

    return (
        <>
            {/* Start : Tag Input Container */}
            <div className="tags-input-container">
                {tags.map((tag, index) => (
                    <Chip key={index} className="tag" onClose={handleTagClick(index)}>
                        {tag}
                    </Chip>
                ))}
                {/* Start : Stags input */}
                <Input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    placeholder="Press enter to add tags"
                    className='my-2'
                />
                {/* End : Stags input */}
            </div>
            {/* End : Tag Input Container */}
        </>
    );
};

export default TagsInput;
