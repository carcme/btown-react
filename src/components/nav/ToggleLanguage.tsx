import { useEffect, useId, useState } from "react";
import { useLanguage } from "@/state/lang-provider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function ToggleLanguage() {
  const { lang, setLang } = useLanguage();
  const [checked, setChecked] = useState(lang === "de" ? true : false);
  const id = useId();

  const countries = [
    { value: "en", flag: "🇬🇧" },
    { value: "de", flag: "🇩🇪" },
  ];

  useEffect(() => {
    if (checked) {
      setLang("de");
    } else {
      setLang("en");
    }
    // resetData();
  }, [checked]);

  return (
    <div>
      <div className="relative inline-grid h-9 grid-cols-[1fr_1fr] items-center text-sm font-medium">
        <Switch
          id={id}
          checked={checked}
          onCheckedChange={setChecked}
          className="peer data-[state=checked]:bg-input/50 data-[state=unchecked]:bg-input/50 absolute inset-0 h-[inherit] w-auto [&_span]:h-full [&_span]:w-1/2 [&_span]:transition-transform [&_span]:duration-300 [&_span]:ease-[cubic-bezier(0.16,1,0.3,1)] [&_span]:data-[state=checked]:translate-x-full [&_span]:data-[state=checked]:rtl:-translate-x-full"
        />
        <span className="peer-data-[state=checked]:text-muted-foreground/70 pointer-events-none relative ms-0.5 flex min-w-8 items-center justify-center text-center">
          <span className="text-lg leading-none">{countries[0].flag}</span>
        </span>
        <span className="peer-data-[state=unchecked]:text-muted-foreground/70 pointer-events-none relative me-0.5 flex min-w-8 items-center justify-center text-center">
          <span className="text-lg leading-none">{countries[1].flag}</span>
        </span>
      </div>
      <Label htmlFor={id} className="sr-only">
        Language switch
      </Label>
    </div>
  );
}
