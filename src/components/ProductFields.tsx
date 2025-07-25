import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

interface ProductField {
  id: string;
  type: "text" | "select" | "number" | "boolean" | "range";
  label: string;
  options?: string[];
  required?: boolean;
}

interface CategoryFields {
  [key: string]: ProductField[];
}

interface ProductFieldsProps {
  category: string;
  values: Record<string, any>;
  onChange: (field: string, value: any) => void;
}

// Campos inteligentes por categoria
const categoryFields: CategoryFields = {
  "Imóveis": [
    {
      id: "property_type",
      type: "select",
      label: "Tipo",
      options: ["Casa", "Apartamento", "Cobertura", "Terreno", "Comercial", "Galpão"],
      required: true
    },
    {
      id: "purpose",
      type: "select",
      label: "Finalidade",
      options: ["Venda", "Aluguel"],
      required: true
    },
    {
      id: "bedrooms",
      type: "select",
      label: "Quartos",
      options: ["1", "2", "3", "4", "5+"]
    },
    {
      id: "bathrooms",
      type: "select",
      label: "Banheiros",
      options: ["1", "2", "3", "4", "5+"]
    },
    {
      id: "parking_spots",
      type: "select",
      label: "Vagas de Garagem",
      options: ["0", "1", "2", "3", "4", "5+"]
    },
    {
      id: "area",
      type: "number",
      label: "Área útil (m²)"
    },
    {
      id: "include_condo_fee",
      type: "boolean",
      label: "Incluir preço do condomínio"
    },
    {
      id: "below_market_price",
      type: "boolean",
      label: "Preço abaixo do mercado"
    }
  ],
  "Veículos": [
    {
      id: "vehicle_type",
      type: "select",
      label: "Tipo",
      options: ["Carro", "Moto", "Caminhão", "Van", "Náutica"],
      required: true
    },
    {
      id: "brand",
      type: "text",
      label: "Marca",
      required: true
    },
    {
      id: "model",
      type: "text",
      label: "Modelo",
      required: true
    },
    {
      id: "year",
      type: "number",
      label: "Ano"
    },
    {
      id: "condition",
      type: "select",
      label: "Estado",
      options: ["Novo", "Usado", "Recondicionado"]
    },
    {
      id: "fuel_type",
      type: "select",
      label: "Combustível",
      options: ["Flex", "Gasolina", "Etanol", "Diesel", "Elétrico", "Híbrido"]
    },
    {
      id: "transmission",
      type: "select",
      label: "Transmissão",
      options: ["Manual", "Automático", "Semi-automático"]
    }
  ],
  "Moda": [
    {
      id: "clothing_type",
      type: "select",
      label: "Tipo",
      options: ["Blusa", "Calça", "Vestido", "Jaqueta", "Acessórios", "Calçados"],
      required: true
    },
    {
      id: "size",
      type: "select",
      label: "Tamanho",
      options: ["PP", "P", "M", "G", "GG", "XGG", "Infantil"]
    },
    {
      id: "color",
      type: "text",
      label: "Cor"
    },
    {
      id: "material",
      type: "text",
      label: "Material"
    },
    {
      id: "style",
      type: "select",
      label: "Estilo",
      options: ["Casual", "Social", "Fitness", "Festa", "Praia"]
    },
    {
      id: "gender",
      type: "select",
      label: "Gênero",
      options: ["Feminino", "Masculino", "Unissex", "Infantil"]
    }
  ],
  "Eletrônicos": [
    {
      id: "electronic_type",
      type: "select",
      label: "Tipo",
      options: ["Smartphone", "Notebook", "TV", "Tablet", "Acessórios", "Games"],
      required: true
    },
    {
      id: "brand",
      type: "text",
      label: "Marca",
      required: true
    },
    {
      id: "model",
      type: "text",
      label: "Modelo"
    },
    {
      id: "condition",
      type: "select",
      label: "Estado",
      options: ["Novo", "Usado", "Recondicionado"]
    },
    {
      id: "warranty",
      type: "boolean",
      label: "Com garantia"
    }
  ],
  "Casa e Jardim": [
    {
      id: "home_type",
      type: "select",
      label: "Tipo",
      options: ["Móveis", "Decoração", "Eletrodomésticos", "Jardim", "Ferramentas"],
      required: true
    },
    {
      id: "condition",
      type: "select",
      label: "Estado",
      options: ["Novo", "Usado", "Seminovo"]
    },
    {
      id: "material",
      type: "text",
      label: "Material"
    },
    {
      id: "color",
      type: "text",
      label: "Cor"
    }
  ]
};

export const ProductFields = ({ category, values, onChange }: ProductFieldsProps) => {
  const fields = categoryFields[category] || [];

  const renderField = (field: ProductField) => {
    const value = values[field.id] || "";

    switch (field.type) {
      case "text":
        return (
          <Input
            value={value}
            onChange={(e) => onChange(field.id, e.target.value)}
            placeholder={`Digite ${field.label.toLowerCase()}`}
          />
        );

      case "number":
        return (
          <Input
            type="number"
            value={value}
            onChange={(e) => onChange(field.id, e.target.value)}
            placeholder={`Digite ${field.label.toLowerCase()}`}
          />
        );

      case "select":
        return (
          <Select value={value} onValueChange={(val) => onChange(field.id, val)}>
            <SelectTrigger>
              <SelectValue placeholder={`Selecione ${field.label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "boolean":
        return (
          <div className="flex items-center space-x-2">
            <Switch
              checked={value === true}
              onCheckedChange={(checked) => onChange(field.id, checked)}
            />
            <span className="text-sm text-muted-foreground">
              {value ? "Sim" : "Não"}
            </span>
          </div>
        );

      default:
        return null;
    }
  };

  if (fields.length === 0) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        <p>Selecione uma categoria para ver os campos específicos</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {fields.map((field) => (
        <div key={field.id} className="space-y-2">
          <Label htmlFor={field.id}>
            {field.label}
            {field.required && <span className="text-destructive ml-1">*</span>}
          </Label>
          {renderField(field)}
        </div>
      ))}
    </div>
  );
};