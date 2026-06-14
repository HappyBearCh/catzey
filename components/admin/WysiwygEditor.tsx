'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import LinkExtension from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import { useEffect, useRef } from 'react';

interface Props {
  name: string;
  defaultValue?: string | null;
  placeholder?: string;
  rows?: number;
}

function plainToHtml(text: string): string {
  if (!text || text.trimStart().startsWith('<')) return text ?? '';
  return text
    .split(/\n+/)
    .filter(Boolean)
    .map((p) => `<p>${p.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>`)
    .join('');
}

function ToolbarBtn({
  active,
  disabled,
  onClick,
  title,
  children,
}: {
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onClick={onClick}
      className={`px-2 py-1 rounded text-sm font-medium transition-colors ${
        active ? 'bg-gray-800 text-white' : 'text-gray-600 hover:bg-gray-100'
      } ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
}

export function WysiwygEditor({ name, defaultValue, rows = 18 }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const initialHtml = plainToHtml(defaultValue ?? '');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      LinkExtension.configure({ openOnClick: false }),
    ],
    content: initialHtml,
    onUpdate({ editor }) {
      if (inputRef.current) {
        inputRef.current.value = editor.getHTML();
      }
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none px-3 py-2 min-h-0',
      },
    },
  });

  useEffect(() => {
    if (editor && inputRef.current) {
      inputRef.current.value = editor.getHTML();
    }
  }, [editor]);

  if (!editor) return null;

  function setLink() {
    const url = window.prompt('Enter URL:', editor!.getAttributes('link').href ?? '');
    if (url === null) return;
    if (url === '') {
      editor!.chain().focus().extendMarkRange('link').unsetLink().run();
    } else {
      editor!.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
  }

  function insertSpoiler() {
    const { state } = editor!;
    const { empty, from, to } = state.selection;
    if (empty) {
      editor!.chain().focus().insertContent('<span class="spoiler">spoiler text here</span> ').run();
    } else {
      const text = state.doc.textBetween(from, to, ' ');
      editor!.chain().focus().deleteSelection().insertContent(`<span class="spoiler">${text}</span>`).run();
    }
  }

  function insertVideo() {
    const input = window.prompt('Enter YouTube URL:', '');
    if (!input) return;
    const match = input.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
    const videoId = match?.[1];
    if (!videoId) { alert('Could not parse YouTube URL. Use a standard youtube.com/watch?v= or youtu.be/ link.'); return; }
    const html = `<div class="video-embed"><iframe src="https://www.youtube.com/embed/${videoId}" allowfullscreen loading="lazy" title="YouTube video"></iframe></div>`;
    editor!.chain().focus().insertContent(html).run();
  }

  function insertCallout() {
    const html = `<div class="callout-box"><p class="callout-box-title">📺 Where to Watch / Read</p><ul><li><a href="https://mangaplus.shueisha.co.jp" target="_blank" rel="noopener">Manga Plus (Free)</a></li><li><a href="https://www.viz.com/shonenjump" target="_blank" rel="noopener">Viz Manga ($2.99/mo)</a></li><li><a href="https://www.crunchyroll.com" target="_blank" rel="noopener">Crunchyroll</a></li></ul></div>`;
    editor!.chain().focus().insertContent(html).run();
  }

  const minHeight = `${rows * 1.6}rem`;

  return (
    <div className="border border-gray-200 rounded-sm focus-within:border-primary overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b border-gray-200 bg-gray-50">
        <ToolbarBtn
          active={editor.isActive('bold')}
          onClick={() => editor.chain().focus().toggleBold().run()}
          title="Bold"
        >
          <strong>B</strong>
        </ToolbarBtn>
        <ToolbarBtn
          active={editor.isActive('italic')}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          title="Italic"
        >
          <em>I</em>
        </ToolbarBtn>
        <ToolbarBtn
          active={editor.isActive('underline')}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          title="Underline"
        >
          <span className="underline">U</span>
        </ToolbarBtn>

        <span className="w-px h-5 bg-gray-200 mx-1" />

        <ToolbarBtn
          active={editor.isActive('heading', { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          title="Heading 2"
        >
          H2
        </ToolbarBtn>
        <ToolbarBtn
          active={editor.isActive('heading', { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          title="Heading 3"
        >
          H3
        </ToolbarBtn>

        <span className="w-px h-5 bg-gray-200 mx-1" />

        <ToolbarBtn
          active={editor.isActive('bulletList')}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          title="Bullet list"
        >
          ≡
        </ToolbarBtn>
        <ToolbarBtn
          active={editor.isActive('orderedList')}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          title="Numbered list"
        >
          1≡
        </ToolbarBtn>
        <ToolbarBtn
          active={editor.isActive('blockquote')}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          title="Blockquote"
        >
          &ldquo;
        </ToolbarBtn>

        <span className="w-px h-5 bg-gray-200 mx-1" />

        <ToolbarBtn
          active={editor.isActive('link')}
          onClick={setLink}
          title="Link"
        >
          🔗
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Horizontal rule"
        >
          —
        </ToolbarBtn>

        <span className="w-px h-5 bg-gray-200 mx-1" />

        <ToolbarBtn
          disabled={!editor.can().undo()}
          onClick={() => editor.chain().focus().undo().run()}
          title="Undo"
        >
          ↩
        </ToolbarBtn>
        <ToolbarBtn
          disabled={!editor.can().redo()}
          onClick={() => editor.chain().focus().redo().run()}
          title="Redo"
        >
          ↪
        </ToolbarBtn>

        <span className="w-px h-5 bg-gray-200 mx-1" />

        <ToolbarBtn onClick={insertSpoiler} title="Spoiler tag (click to reveal)">
          🙈
        </ToolbarBtn>
        <ToolbarBtn onClick={insertVideo} title="Embed YouTube video">
          ▶
        </ToolbarBtn>
        <ToolbarBtn onClick={insertCallout} title="Insert Where to Watch callout">
          📺
        </ToolbarBtn>
      </div>

      {/* Editor area */}
      <div style={{ minHeight }}>
        <EditorContent editor={editor} />
      </div>

      <input ref={inputRef} type="hidden" name={name} defaultValue={initialHtml} />
    </div>
  );
}
