// In src/routes/test-commons.tsx
import { createFileRoute } from "@tanstack/react-router";
import { CommonsImage } from "@/components/CommonsImage";

export const Route = createFileRoute("/test-commons")({
  component: TestCommonsComponent,
});

const testCases = [
  {
    title: "Direct Commons File: URL",
    url: "https://commons.wikimedia.org/wiki/File:Berlin-Volksbuehne_am_Rosa-Luxemburg-Platz-06-2006-gje.jpg",
  },
  {
    title: "Link containing File: image",
    url: "https://commons.wikimedia.org/wiki/File:Neue_Wache.JPG",
  },
  {
    title: "Wikidata Q-ID (Berliner Fernsehturm)",
    url: "Q151356",
  },
  {
    title: "Category: Image",
    url: "Category:Berliner Fernsehturm",
  },
  {
    title: "Pre-processed Thumbnail",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Urania-Weltzeituhr_auf_dem_Alexanderplatz_in_Berlin_2015.jpg/800px-Urania-Weltzeituhr_auf_dem_Alexanderplatz_in_Berlin_2015.jpg",
  },
  {
    title: "File: Image",
    url: "File:Berlin St.-Hedwigskathedrale.JPG",
  },
  {
    title: "file: Image - character case matters",
    url: "file:Berlin St.-Hedwigskathedrale.JPG",
  },
  {
    title: "File: Image",
    url: "File:Parodia (Eduard Habicher) - 1015-897-(118).jpg",
  },

  {
    title: "Google Image - Not shown",
    url: "https://photos.app.goo.gl/z7Eax1mrm2Wafqpw8",
  },
  // ... and other test cases
];

function TestCommonsComponent() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Testing the &lt;CommonsImage /&gt; Component
      </h1>
      <div className="space-y-8">
        {testCases.map((test) => (
          <div key={test.title} className="p-4 border rounded-lg">
            <h2 className="text-lg font-semibold mb-2">{test.title}</h2>
            <p className="text-sm text-muted-foreground mb-4 break-all">
              Input URL: <code>{test.url || '""'}</code>
            </p>

            <div className="w-full h-64 flex items-center justify-center bg-muted rounded-md overflow-hidden">
              <CommonsImage
                url={test.url}
                width={400}
                alt={test.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
