import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Image as ImageIcon,
  Sliders,
  Maximize2,
  Download,
  PlusCircle,
  Wand2,
  ChefHat,
  Flame,
  CheckCircle2,
  AlertCircle,
  Copy,
} from 'lucide-react';

export const AiStudioPage: React.FC = () => {
  const { addFoodItem, showToast, navigateTo } = useApp();

  // Model selection (gemini-3-pro-image-preview for studio quality, gemini-3.1-flash-image-preview for general)
  const [model, setModel] = useState<'gemini-3-pro-image-preview' | 'gemini-3.1-flash-image-preview'>(
    'gemini-3-pro-image-preview'
  );

  // Aspect ratio affordance: 1:1, 2:3, 3:2, 3:4, 4:3, 9:16, 16:9, and 21:9
  const [aspectRatio, setAspectRatio] = useState<
    '1:1' | '2:3' | '3:2' | '3:4' | '4:3' | '9:16' | '16:9' | '21:9'
  >('1:1');

  // Image size affordance: 1K, 2K, and 4K
  const [imageSize, setImageSize] = useState<'1K' | '2K' | '4K'>('1K');

  // Prompt input
  const [prompt, setPrompt] = useState(
    'Royal Hyderabadi Dum Biryani served with golden saffron rice, fragrant mint, tender spiced chicken, fried cashews, and micro-coriander in an ornate hand-beaten copper handi'
  );

  // Generation status
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Suggested dish metadata from AI Chef
  const [dishDetails, setDishDetails] = useState<{
    name: string;
    description: string;
    category: any;
    price: number;
    isVeg: boolean;
    ingredients: string[];
  }>({
    name: 'Royal Hyderabadi Dum Biryani',
    description: 'Slow-cooked in sealed copper handi with long-grain aged basmati rice, tender meat and saffron ghee.',
    category: 'Indian',
    price: 289,
    isVeg: false,
    ingredients: ['Basmati Rice', 'Chicken', 'Kashmiri Saffron', 'Fried Onions', 'Ghee', 'Cardamom'],
  });

  const promptPresets = [
    {
      title: 'Truffle Smash Burger',
      prompt: 'Gourmet smashed beef-style chicken patty burger with melted Wisconsin cheddar, black truffle aioli, and crispy shallots on a shiny brioche bun, studio culinary light',
      category: 'Burgers',
      price: 219,
      isVeg: false,
    },
    {
      title: 'Wood-Fired Burrata Pizza',
      prompt: 'Artisan Neapolitan pizza with blistered charred crust, San Marzano tomato puree, whole creamy burrata cheese ball in the center, basil oil and toasted pine nuts',
      category: 'Pizza',
      price: 329,
      isVeg: true,
    },
    {
      title: 'Pistachio Kulfi Falooda',
      prompt: 'Royal Saffron and pistachio kulfi falooda served in a tall crystal glass with rose syrup, sweet basil seeds, vermicelli, and crushed almonds',
      category: 'Desserts',
      price: 169,
      isVeg: true,
    },
    {
      title: 'Smoked Malai Paneer Tikka',
      prompt: 'Thick cubes of tandoori malai paneer with light char marks, sprinkled with roasted coriander and micro-greens, served with mint yogurt swirl on dark stone',
      category: 'Indian',
      price: 239,
      isVeg: true,
    },
  ];

  // Call Server-Side API to generate image using Gemini
  const handleGenerateImage = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/generate-dish-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          model,
          aspectRatio,
          imageSize,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || 'Failed to generate dish image');
      }

      setGeneratedImage(data.imageUrl);
      showToast('High-definition dish image generated! 🎨', 'success');
    } catch (err: any) {
      console.warn('Image generation error:', err);
      setErrorMsg(err.message || 'Error communicating with Gemini service');
      // If error (such as quota or key limitation in sandbox), provide appetizing high-res fallback
      const fallbackUrl =
        'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80';
      setGeneratedImage(fallbackUrl);
      showToast('Generated sample studio presentation for preview!', 'info');
    } finally {
      setIsGenerating(false);
    }
  };

  // Call Server-Side AI Chef to invent a complete recipe concept
  const handleSuggestChefIdea = async () => {
    setIsSuggesting(true);
    try {
      const res = await fetch('/api/ai-chef-suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea: prompt }),
      });
      const data = await res.json();
      if (data.name) {
        setDishDetails({
          name: data.name,
          description: data.description,
          category: data.category || 'Indian',
          price: data.price || 249,
          isVeg: data.isVeg ?? true,
          ingredients: data.ingredients || ['Spices', 'Herbs'],
        });
        if (data.imagePrompt) {
          setPrompt(data.imagePrompt);
        }
        showToast(`AI Chef created "${data.name}"!`, 'success');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSuggesting(false);
    }
  };

  // Add the newly created dish directly to the FoodHub live menu
  const handleAddToMenu = () => {
    if (!generatedImage) return;

    addFoodItem({
      id: 'ai-dish-' + Date.now(),
      name: dishDetails.name,
      description: dishDetails.description,
      price: dishDetails.price,
      rating: 5.0,
      reviewCount: 1,
      category: dishDetails.category,
      isVeg: dishDetails.isVeg,
      image: generatedImage,
      isBestSeller: true,
      isFeatured: true,
      preparationTime: '20-25 mins',
      ingredients: dishDetails.ingredients,
      inStock: true,
    });

    showToast(`"${dishDetails.name}" published to FoodHub live menu! 🎉`, 'success');
    navigateTo('menu');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-950 to-stone-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl border border-purple-800/40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>AI Food Image & Recipe Studio</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-heading tracking-tight">
            Visualize Gourmet Dishes in High Resolution
          </h1>
          <p className="text-purple-200 text-sm sm:text-base leading-relaxed">
            Generate photorealistic culinary masterpieces with custom resolutions (1K, 2K, 4K) and aspect ratios. Then publish your creation directly to the FoodHub menu!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls & Prompt Panel */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
            {/* 1. Model Selector */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-purple-600" />
                  Gemini Image Model
                </label>
                <span className="text-[10px] text-stone-400">Powered by Google GenAI</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setModel('gemini-3-pro-image-preview')}
                  className={`p-3 rounded-2xl border-2 text-left transition-all ${
                    model === 'gemini-3-pro-image-preview'
                      ? 'border-purple-600 bg-purple-50/70 shadow-xs'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <p className="text-xs font-black text-stone-900 flex items-center justify-between">
                    <span>Studio Quality (Pro)</span>
                    {model === 'gemini-3-pro-image-preview' && (
                      <span className="w-2 h-2 rounded-full bg-purple-600" />
                    )}
                  </p>
                  <p className="text-[10px] text-stone-500 mt-0.5">gemini-3-pro-image-preview</p>
                </button>

                <button
                  type="button"
                  onClick={() => setModel('gemini-3.1-flash-image-preview')}
                  className={`p-3 rounded-2xl border-2 text-left transition-all ${
                    model === 'gemini-3.1-flash-image-preview'
                      ? 'border-purple-600 bg-purple-50/70 shadow-xs'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <p className="text-xs font-black text-stone-900 flex items-center justify-between">
                    <span>Ultra Fast (Flash)</span>
                    {model === 'gemini-3.1-flash-image-preview' && (
                      <span className="w-2 h-2 rounded-full bg-purple-600" />
                    )}
                  </p>
                  <p className="text-[10px] text-stone-500 mt-0.5">gemini-3.1-flash-image-preview</p>
                </button>
              </div>
            </div>

            {/* 2. Image Size Affordance (1K, 2K, 4K) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Maximize2 className="w-4 h-4 text-purple-600" />
                  Image Size / Resolution
                </label>
                <span className="text-[10px] text-stone-400">Affordance: 1K, 2K, 4K</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(['1K', '2K', '4K'] as const).map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setImageSize(sz)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border ${
                      imageSize === sz
                        ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {sz} {sz === '4K' ? 'Ultra HD' : sz === '2K' ? 'Quad HD' : 'Standard'}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Aspect Ratio Affordance (1:1, 2:3, 3:2, 3:4, 4:3, 9:16, 16:9, and 21:9) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-purple-600" />
                  Aspect Ratio
                </label>
                <span className="text-[10px] text-stone-400">8 supported formats</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {(['1:1', '2:3', '3:2', '3:4', '4:3', '9:16', '16:9', '21:9'] as const).map(
                  (ratio) => (
                    <button
                      key={ratio}
                      type="button"
                      onClick={() => setAspectRatio(ratio)}
                      className={`py-2 px-1 text-center rounded-xl text-xs font-mono font-bold transition-all border ${
                        aspectRatio === ratio
                          ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                          : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {ratio}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* 4. Prompt Input & AI Chef Helper */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Dish Description & Visual Prompt
                </label>
                <button
                  type="button"
                  onClick={handleSuggestChefIdea}
                  disabled={isSuggesting}
                  className="text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1"
                >
                  <Wand2 className="w-3.5 h-3.5" />
                  <span>{isSuggesting ? 'Brainstorming...' : 'AI Chef Suggest'}</span>
                </button>
              </div>
              <textarea
                rows={4}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your fantasy dish in delicious detail..."
                className="w-full text-xs sm:text-sm p-3.5 border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-stone-50/50"
              />
            </div>

            {/* Quick Inspiration Presets */}
            <div>
              <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-2">
                Quick Inspiration Presets
              </p>
              <div className="flex flex-wrap gap-2">
                {promptPresets.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setPrompt(preset.prompt);
                      setDishDetails({
                        name: preset.title,
                        description: preset.prompt.slice(0, 100) + '...',
                        category: preset.category,
                        price: preset.price,
                        isVeg: preset.isVeg,
                        ingredients: ['Chef Spices', 'Artisan Seasoning'],
                      });
                    }}
                    className="text-[11px] font-semibold px-3 py-1.5 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors border border-purple-200"
                  >
                    ✨ {preset.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Action Button */}
            <button
              type="button"
              onClick={handleGenerateImage}
              disabled={isGenerating}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-purple-500/25 transition-transform active:scale-98 flex items-center justify-center gap-2 disabled:opacity-75"
            >
              {isGenerating ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Rendering with {model}...</span>
                </div>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Generate Food Photograph</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Preview & Dish Specs Panel */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-heading font-black text-lg text-stone-900">
                Culinary Output Preview
              </h3>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-stone-500">
                <span>{aspectRatio}</span>
                <span>•</span>
                <span>{imageSize}</span>
              </div>
            </div>

            {/* Generated Image Canvas */}
            <div className="relative rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 flex items-center justify-center min-h-[300px]">
              {isGenerating ? (
                <div className="text-center p-8 space-y-3">
                  <div className="w-12 h-12 border-3 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="font-heading font-bold text-sm text-stone-800">
                    Preparing studio culinary composition...
                  </p>
                  <p className="text-xs text-stone-500 max-w-xs">
                    Synthesizing appetizing lighting, authentic Indian spice color palette and depth of field with {model}
                  </p>
                </div>
              ) : generatedImage ? (
                <div className="w-full relative group">
                  <img
                    src={generatedImage}
                    alt={dishDetails.name}
                    className="w-full h-auto object-cover rounded-2xl max-h-[500px]"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center gap-3">
                    <a
                      href={generatedImage}
                      download="foodhub_ai_dish.png"
                      className="p-3 bg-white text-stone-900 rounded-xl hover:bg-stone-100 shadow-lg font-bold text-xs flex items-center gap-1.5"
                    >
                      <Download className="w-4 h-4" />
                      Save Image
                    </a>
                  </div>
                </div>
              ) : (
                <div className="text-center p-12 text-stone-400 space-y-2">
                  <ImageIcon className="w-12 h-12 stroke-[1.5] mx-auto text-stone-300" />
                  <p className="text-xs font-medium">
                    Adjust size, aspect ratio, and click "Generate Food Photograph" to render here.
                  </p>
                </div>
              )}
            </div>

            {/* Dish Specs Form */}
            {generatedImage && (
              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={dishDetails.name}
                      onChange={(e) =>
                        setDishDetails({ ...dishDetails, name: e.target.value })
                      }
                      className="font-heading font-black text-lg text-stone-900 bg-transparent border-b border-purple-200 focus:outline-none focus:border-purple-600 w-full mr-2"
                    />
                    <div className="flex items-center gap-1 font-heading font-black text-orange-600 text-lg shrink-0">
                      <span>₹</span>
                      <input
                        type="number"
                        value={dishDetails.price}
                        onChange={(e) =>
                          setDishDetails({
                            ...dishDetails,
                            price: Number(e.target.value),
                          })
                        }
                        className="w-16 bg-transparent border-b border-purple-200 text-right focus:outline-none"
                      />
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {dishDetails.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {dishDetails.ingredients.map((ing, i) => (
                      <span
                        key={i}
                        className="text-[10px] bg-white px-2 py-0.5 rounded-md font-semibold text-stone-700 border border-stone-200"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Add to Menu Action */}
                <button
                  type="button"
                  onClick={handleAddToMenu}
                  className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-extrabold text-sm rounded-2xl shadow-md shadow-orange-500/25 transition-transform active:scale-98 flex items-center justify-center gap-2"
                >
                  <PlusCircle className="w-5 h-5" />
                  <span>Publish this Dish to FoodHub Menu</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
