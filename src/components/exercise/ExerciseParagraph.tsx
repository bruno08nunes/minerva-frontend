export default function ExerciseParagraph({ content }: { content: string }) {
    return (
        <p className="text-lavender-blush text-center sm:text-xl text-lg max-w-[800px] mx-auto mb-6">
            {content}
        </p>
    );
}
