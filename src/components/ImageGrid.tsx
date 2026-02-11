type Image = {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string;
};

export default function ImageGrid({ images }: { images: Image[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
      {images.map((img, index) => (
        <img
          key={`${img.id}=${index}`}
          src={img.urls.small}
          alt={img.alt_description || "image"}
          className="w-full h-60 object-cover rounded-lg hover:scale-105 transition duration-300 cursor-pointer"
        />
      ))}
    </div>
  );
}
