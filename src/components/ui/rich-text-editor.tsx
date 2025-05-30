import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Button } from './button';
import { Bold, Italic, List, ListOrdered, Code, Link as LinkIcon, Image as ImageIcon, Eye, Code2 } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  onImageUpload?: (file: File) => Promise<string | null>;
}

export const RichTextEditor = ({
  value,
  onChange,
  placeholder = 'Write something...',
  className,
  onImageUpload,
}: RichTextEditorProps) => {
  const [showSource, setShowSource] = useState(false);
  const [sourceCode, setSourceCode] = useState(value);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 hover:text-blue-600 underline',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full',
        },
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
      setSourceCode(html);
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm dark:prose-invert max-w-none focus:outline-none min-h-[150px]',
      },
    },
  });

  const toggleSource = () => {
    if (showSource) {
      // Switching from source to visual editor
      if (editor) {
        editor.commands.setContent(sourceCode);
      }
    }
    setShowSource(!showSource);
  };

  const handleImageUpload = async () => {
    if (!onImageUpload) return;

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const url = await onImageUpload(file);
      if (url) {
        editor?.chain().focus().setImage({ src: url }).run();
      }
    };

    input.click();
  };

  return (
    <div className={cn('rounded-md border border-input bg-background', className)}>
      <div className="flex items-center gap-2 p-2 border-b">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={editor?.isActive('bold') ? 'bg-accent' : ''}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={editor?.isActive('italic') ? 'bg-accent' : ''}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className={editor?.isActive('bulletList') ? 'bg-accent' : ''}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          className={editor?.isActive('orderedList') ? 'bg-accent' : ''}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
          className={editor?.isActive('codeBlock') ? 'bg-accent' : ''}
        >
          <Code className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            const url = window.prompt('Enter URL');
            if (url) {
              editor?.chain().focus().setLink({ href: url }).run();
            }
          }}
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleImageUpload}
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
        <div className="flex-1" />
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSource}
          className={showSource ? 'bg-accent' : ''}
        >
          {showSource ? <Eye className="h-4 w-4" /> : <Code2 className="h-4 w-4" />}
        </Button>
      </div>
      {showSource ? (
        <textarea
          value={sourceCode}
          onChange={(e) => {
            setSourceCode(e.target.value);
            onChange(e.target.value);
          }}
          className="w-full p-4 font-mono text-sm min-h-[150px] focus:outline-none"
          placeholder="Write your HTML here..."
        />
      ) : (
        <EditorContent editor={editor} />
      )}
    </div>
  );
}; 