import { Creation } from "@/services/creationsService";
import { SectionHeading } from "@/components/ui/section-heading";

type CreationDetailProps = {
  creation: Creation;
};

export const CreationDetail = ({ creation }: CreationDetailProps) => {
  const {
    title,
    featured_image,
    overview,
    motivation,
    tools,
    achievements,
    downsides,
    gallery,
    future_plans,
    conclusion,
    date,
    status,
    tags
  } = creation;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_progress':
        return 'bg-white/10 text-white/70';
      case 'completed':
        return 'bg-white/20 text-white/90';
      case 'archived':
        return 'bg-white/5 text-white/50';
      default:
        return 'bg-white/10 text-white/70';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in_progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      case 'archived':
        return 'Archived';
      default:
        return status;
    }
  };

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <section className="mb-16">
      <SectionHeading title={title} />
      <div className="mt-6">{children}</div>
    </section>
  );

  const ImageGallery = ({ images, captions }: { images: string[]; captions?: string[] }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((image, index) => (
        <div key={index} className="relative aspect-[4/3] overflow-hidden">
          <img
            src={image}
            alt={captions?.[index] || `Gallery image ${index + 1}`}
            className="w-full h-full object-cover"
          />
          {captions?.[index] && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4">
              <p className="text-sm text-white">{captions[index]}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const List = ({ items }: { items: string[] }) => (
    <ul className="list-disc list-inside space-y-2">
      {items.map((item, index) => (
        <li key={index} className="text-white/70">{item}</li>
      ))}
    </ul>
  );

  return (
    <div className="container mx-auto px-4 max-w-screen-xl py-24">
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-0.5 bg-gradient-to-r from-white/50 to-transparent" />
          <span className={`text-sm tracking-widest uppercase px-2 py-1 ${getStatusColor(status)}`}>
            {getStatusText(status)}
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl tracking-wide mb-6">
          <span className="text-white font-extralight">{title}</span>
        </h1>
        <div className="flex items-center gap-4 text-white/50">
          <span>{new Date(date).toLocaleDateString('default', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
          {tags && tags.length > 0 && (
            <div className="flex gap-2">
              {tags.map((tag, index) => (
                <span 
                  key={tag.id || index} 
                  className="text-xs bg-white/10 text-white/70 px-3 py-1 rounded-none font-medium uppercase tracking-wider"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {featured_image && (
        <div className="relative aspect-[16/9] mb-16 overflow-hidden">
          <img
            src={featured_image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {overview && (
        <Section title="Overview">
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-white/70">{overview.text}</p>
            {overview.images && overview.images.length > 0 && (
              <ImageGallery images={overview.images} />
            )}
          </div>
        </Section>
      )}

      {motivation && (
        <Section title="Motivation">
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-white/70">{motivation.text}</p>
            {motivation.images && motivation.images.length > 0 && (
              <ImageGallery images={motivation.images} />
            )}
          </div>
        </Section>
      )}

      {tools && (
        <Section title="Tools">
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-white/70 mb-6">{tools.text}</p>
            {tools.list && <List items={tools.list} />}
            {tools.images && tools.images.length > 0 && (
              <ImageGallery images={tools.images} />
            )}
          </div>
        </Section>
      )}

      {achievements && (
        <Section title="Achievements">
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-white/70 mb-6">{achievements.text}</p>
            {achievements.list && <List items={achievements.list} />}
            {achievements.images && achievements.images.length > 0 && (
              <ImageGallery images={achievements.images} />
            )}
          </div>
        </Section>
      )}

      {downsides && (
        <Section title="Challenges">
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-white/70 mb-6">{downsides.text}</p>
            {downsides.list && <List items={downsides.list} />}
            {downsides.images && downsides.images.length > 0 && (
              <ImageGallery images={downsides.images} />
            )}
          </div>
        </Section>
      )}

      {gallery && gallery.images.length > 0 && (
        <Section title="Gallery">
          <ImageGallery images={gallery.images} captions={gallery.captions} />
        </Section>
      )}

      {future_plans && (
        <Section title="Future Plans">
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-white/70 mb-6">{future_plans.text}</p>
            {future_plans.list && <List items={future_plans.list} />}
            {future_plans.images && future_plans.images.length > 0 && (
              <ImageGallery images={future_plans.images} />
            )}
          </div>
        </Section>
      )}

      {conclusion && (
        <Section title="Conclusion">
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-white/70">{conclusion.text}</p>
            {conclusion.images && conclusion.images.length > 0 && (
              <ImageGallery images={conclusion.images} />
            )}
          </div>
        </Section>
      )}
    </div>
  );
}; 