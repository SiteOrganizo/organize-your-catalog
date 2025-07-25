import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  categories: string[];
  setCategories: (categories: string[]) => void;
}

export const CategoryInput = ({ value, onChange, categories, setCategories }: Props) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleInputChange = (text: string) => {
    setInputValue(text);
    setSuggestions(
      categories.filter((cat) =>
        cat.toLowerCase().includes(text.toLowerCase()) && cat !== value
      )
    );
  };

  const handleSelect = (cat: string) => {
    onChange(cat);
    setInputValue("");
    setSuggestions([]);
  };

  const handleCreateCategory = () => {
    if (!inputValue.trim()) return;
    const newCategory = inputValue.trim();
    if (!categories.includes(newCategory)) {
      const updated = [...categories, newCategory];
      setCategories(updated);
    }
    onChange(newCategory);
    setInputValue("");
    setSuggestions([]);
  };

  const handleClear = () => {
    onChange("");
  };

  return (
    <div className="space-y-1">
      <Label>Categoria *</Label>
      <div className="flex gap-2">
        <Input
          placeholder="Digite ou selecione uma categoria"
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
        />
        <Button
          type="button"
          onClick={handleCreateCategory}
          disabled={!inputValue.trim()}
          className="shrink-0"
        >
          <Plus className="w-4 h-4 mr-1" />
          Criar
        </Button>
      </div>

      {value && (
        <Badge variant="outline" className="mt-2">
          {value}
          <X className="w-3 h-3 ml-1 cursor-pointer" onClick={handleClear} />
        </Badge>
      )}

      {suggestions.length > 0 && (
        <ul className="mt-2 border rounded p-2 bg-card shadow-sm max-h-40 overflow-y-auto">
          {suggestions.map((cat) => (
            <li
              key={cat}
              onClick={() => handleSelect(cat)}
              className="cursor-pointer px-2 py-1 hover:bg-accent rounded text-sm"
            >
              {cat}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};