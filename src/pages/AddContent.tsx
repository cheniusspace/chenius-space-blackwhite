import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { MouseTrail } from "@/components/effects/MouseTrail";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { Eye, EyeOff, Lock, Plus, X, Upload, Image as ImageIcon } from "lucide-react";

type SectionData = {
  text: string;
  images: string[];
  list?: string[];
};

type CreationFormData = {
  title: string;
  featured_image: string;
  date: string;
  status: 'in_progress' | 'completed' | 'archived';
  tags: string[];
  overview: SectionData;
  motivation: SectionData;
  tools: SectionData;
  achievements: SectionData;
  downsides: SectionData;
  future_plans: SectionData;
  conclusion: SectionData;
  gallery: {
    images: string[];
    captions: string[];
  };
};

const initialFormData: CreationFormData = {
  title: '',
  featured_image: '',
  date: new Date().toISOString().split('T')[0],
  status: 'in_progress',
  tags: [],
  overview: {
    text: '',
    images: []
  },
  motivation: {
    text: '',
    images: []
  },
  tools: {
    text: '',
    images: []
  },
  achievements: {
    text: '',
    images: []
  },
  downsides: {
    text: '',
    images: []
  },
  future_plans: {
    text: '',
    images: []
  },
  conclusion: {
    text: '',
    images: []
  },
  gallery: {
    images: [],
    captions: []
  }
};

const AddContent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<CreationFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImages, setUploadingImages] = useState<{ [key: string]: boolean }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!formData.title.trim()) {
        throw new Error('Title is required');
      }
      if (!formData.featured_image) {
        throw new Error('Featured image is required');
      }
      if (!formData.date) {
        throw new Error('Date is required');
      }
      if (!formData.status) {
        throw new Error('Status is required');
      }

      // Ensure all JSONB fields have the correct structure
      const creationData = {
        title: formData.title.trim(),
        featured_image: formData.featured_image,
        date: formData.date,
        status: formData.status,
        overview: {
          text: formData.overview.text || '',
          images: formData.overview.images || []
        },
        motivation: {
          text: formData.motivation.text || '',
          images: formData.motivation.images || []
        },
        tools: {
          text: formData.tools.text || '',
          images: formData.tools.images || [],
          list: formData.tools.list || []
        },
        achievements: {
          text: formData.achievements.text || '',
          images: formData.achievements.images || [],
          list: formData.achievements.list || []
        },
        downsides: {
          text: formData.downsides.text || '',
          images: formData.downsides.images || [],
          list: formData.downsides.list || []
        },
        gallery: {
          images: formData.gallery.images || [],
          captions: formData.gallery.captions || []
        },
        future_plans: {
          text: formData.future_plans.text || '',
          images: formData.future_plans.images || [],
          list: formData.future_plans.list || []
        },
        conclusion: {
          text: formData.conclusion.text || '',
          images: formData.conclusion.images || []
        }
      };

      // Log the data being sent
      console.log('Submitting creation data:', creationData);

      const { data, error } = await supabase
        .from('creations')
        .insert([creationData])
        .select()
        .single();

      if (error) {
        console.error('Error inserting creation:', error);
        throw new Error(error.message || 'Failed to insert creation');
      }

      // Add tags
      if (formData.tags.length > 0) {
        const { error: tagError } = await supabase
          .from('creations_tags')
          .insert(
            formData.tags.map(tag => ({
              creation_id: data.id,
              tag_id: tag
            }))
          );

        if (tagError) {
          console.error('Error adding tags:', tagError);
          throw new Error(tagError.message || 'Failed to add tags');
        }
      }

      toast({
        title: "Success",
        description: "Creation added successfully",
      });

      navigate('/creations');
    } catch (error) {
      console.error('Error adding creation:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add creation",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSectionChange = (
    section: keyof Omit<CreationFormData, 'title' | 'date' | 'status' | 'tags' | 'gallery'>,
    field: string,
    value: string | string[]
  ) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section] as SectionData,
        [field]: value
      }
    }));
  };

  const handleImageAdd = (
    section: keyof Omit<CreationFormData, 'title' | 'date' | 'status' | 'tags' | 'gallery'>,
    imageUrl: string
  ) => {
    if (!imageUrl.trim()) return;
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section] as SectionData,
        images: [...(prev[section] as SectionData).images, imageUrl.trim()]
      }
    }));
  };

  const handleRemoveImage = (
    section: keyof Omit<CreationFormData, 'title' | 'date' | 'status' | 'tags' | 'gallery'>,
    index: number
  ) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section] as SectionData,
        images: (prev[section] as SectionData).images.filter((_, i) => i !== index)
      }
    }));
  };

  const handleGalleryImageAdd = (imageUrl: string, caption: string) => {
    if (!imageUrl.trim()) return;
    setFormData(prev => ({
      ...prev,
      gallery: {
        images: [...prev.gallery.images, imageUrl.trim()],
        captions: [...prev.gallery.captions, caption.trim()]
      }
    }));
  };

  const handleRemoveGalleryImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      gallery: {
        images: prev.gallery.images.filter((_, i) => i !== index),
        captions: prev.gallery.captions.filter((_, i) => i !== index)
      }
    }));
  };

  const handleImageUpload = async (
    file: File,
    section: keyof Omit<CreationFormData, 'title' | 'date' | 'status' | 'tags' | 'gallery'> | 'gallery' | 'featured_image',
    onUpload?: (url: string) => void
  ) => {
    try {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error('File must be an image');
      }

      // Validate file size (5MB limit)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        throw new Error('File size must be less than 5MB');
      }

      setUploadingImages(prev => ({ ...prev, [section]: true }));

      // Create a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `creations/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError, data } = await supabase.storage
        .from('images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw new Error(uploadError.message);
      }

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      // Add the image URL to the appropriate section
      if (section === 'gallery') {
        setFormData(prev => ({
          ...prev,
          gallery: {
            images: [...prev.gallery.images, publicUrl],
            captions: [...prev.gallery.captions, '']
          }
        }));
      } else if (section === 'featured_image') {
        setFormData(prev => ({
          ...prev,
          featured_image: publicUrl
        }));
        if (onUpload) {
          onUpload(publicUrl);
        }
      } else {
        setFormData(prev => ({
          ...prev,
          [section]: {
            ...prev[section] as SectionData,
            images: [...(prev[section] as SectionData).images, publicUrl]
          }
        }));
      }

      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setUploadingImages(prev => ({ ...prev, [section]: false }));
    }
  };

  const handleEditorImageUpload = async (file: File) => {
    try {
      // Create a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `creations/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
      return null;
    }
  };

  const ImageUploadButton = ({ 
    section, 
    onUpload 
  }: { 
    section: keyof Omit<CreationFormData, 'title' | 'date' | 'status' | 'tags' | 'gallery'> | 'gallery' | 'featured_image';
    onUpload?: (url: string) => void;
  }) => {
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    return (
      <div className="flex items-center space-x-2">
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              handleImageUpload(file, section, onUpload);
            }
          }}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => fileInputRef.current?.click()}
          className="text-white/70 hover:text-white"
          disabled={uploadingImages[section]}
        >
          {uploadingImages[section] ? (
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/70 border-t-transparent" />
          ) : (
            <Upload className="h-4 w-4" />
          )}
        </Button>
      </div>
    );
  };

  const ImagePreview = ({ url }: { url: string }) => (
    <div className="relative group">
      <img
        src={url}
        alt="Preview"
        className="w-20 h-20 object-cover rounded-lg"
      />
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="text-white hover:text-white"
          onClick={() => window.open(url, '_blank')}
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  return (
    <div className="w-full subtle-grid bg-gray-500 text-white">
      <MouseTrail />
      <div className="container mx-auto px-4 max-w-screen-xl py-24">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <SectionHeading title="Add New Creation" />
            <div className="mt-6 space-y-8">
              {/* Basic Information */}
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Basic Information</CardTitle>
                  <CardDescription className="text-white/50">
                    Enter the basic details of your creation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title" className="text-white/70">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="bg-white/5 border-white/10 text-white"
                      required
                    />
                  </div>

                  <div>
                    <Label className="text-white/70">Featured Image</Label>
                    <div className="space-y-4">
                      {formData.featured_image && (
                        <div className="relative group">
                          <ImagePreview url={formData.featured_image} />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute -top-2 -right-2 bg-red-500/80 hover:bg-red-500 text-white"
                            onClick={() => setFormData(prev => ({ ...prev, featured_image: '' }))}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                      <ImageUploadButton 
                        section="featured_image" 
                        onUpload={(url) => setFormData(prev => ({ ...prev, featured_image: url }))}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="date" className="text-white/70">Date</Label>
                    <Input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="bg-white/5 border-white/10 text-white"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="status" className="text-white/70">Status</Label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
                      required
                    >
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </CardContent>
              </Card>

              {/* Overview Section */}
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Overview</CardTitle>
                  <CardDescription className="text-white/50">
                    Provide an overview of your creation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-white/70">Overview Text</Label>
                    <RichTextEditor
                      value={formData.overview.text}
                      onChange={(value) => handleSectionChange('overview', 'text', value)}
                      className="bg-white/5 border-white/10"
                      onImageUpload={handleEditorImageUpload}
                    />
                  </div>
                  <div>
                    <Label className="text-white/70">Images</Label>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-4">
                        {formData.overview.images.map((image, index) => (
                          <div key={index} className="relative group">
                            <ImagePreview url={image} />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute -top-2 -right-2 bg-red-500/80 hover:bg-red-500 text-white"
                              onClick={() => handleRemoveImage('overview', index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                      <ImageUploadButton section="overview" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Motivation Section */}
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Motivation</CardTitle>
                  <CardDescription className="text-white/50">
                    What inspired you to create this?
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-white/70">Motivation Text</Label>
                    <RichTextEditor
                      value={formData.motivation.text}
                      onChange={(value) => handleSectionChange('motivation', 'text', value)}
                      className="bg-white/5 border-white/10"
                      onImageUpload={handleEditorImageUpload}
                    />
                  </div>
                  <div>
                    <Label className="text-white/70">Images</Label>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-4">
                        {formData.motivation.images.map((image, index) => (
                          <div key={index} className="relative group">
                            <ImagePreview url={image} />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute -top-2 -right-2 bg-red-500/80 hover:bg-red-500 text-white"
                              onClick={() => handleRemoveImage('motivation', index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                      <ImageUploadButton section="motivation" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tools Section */}
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Tools</CardTitle>
                  <CardDescription className="text-white/50">
                    What tools and technologies did you use?
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-white/70">Tools Description</Label>
                    <RichTextEditor
                      value={formData.tools.text}
                      onChange={(value) => handleSectionChange('tools', 'text', value)}
                      className="bg-white/5 border-white/10"
                      onImageUpload={handleEditorImageUpload}
                    />
                  </div>
                  <div>
                    <Label className="text-white/70">Images</Label>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-4">
                        {formData.tools.images.map((image, index) => (
                          <div key={index} className="relative group">
                            <ImagePreview url={image} />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute -top-2 -right-2 bg-red-500/80 hover:bg-red-500 text-white"
                              onClick={() => handleRemoveImage('tools', index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                      <ImageUploadButton section="tools" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Achievements Section */}
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Achievements</CardTitle>
                  <CardDescription className="text-white/50">
                    What were the key achievements of your creation?
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-white/70">Achievements Description</Label>
                    <RichTextEditor
                      value={formData.achievements.text}
                      onChange={(value) => handleSectionChange('achievements', 'text', value)}
                      className="bg-white/5 border-white/10"
                      onImageUpload={handleEditorImageUpload}
                    />
                  </div>
                  <div>
                    <Label className="text-white/70">Images</Label>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-4">
                        {formData.achievements.images.map((image, index) => (
                          <div key={index} className="relative group">
                            <ImagePreview url={image} />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute -top-2 -right-2 bg-red-500/80 hover:bg-red-500 text-white"
                              onClick={() => handleRemoveImage('achievements', index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                      <ImageUploadButton section="achievements" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Challenges Section */}
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Challenges</CardTitle>
                  <CardDescription className="text-white/50">
                    What were the challenges you faced?
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-white/70">Challenges Description</Label>
                    <RichTextEditor
                      value={formData.downsides.text}
                      onChange={(value) => handleSectionChange('downsides', 'text', value)}
                      className="bg-white/5 border-white/10"
                      onImageUpload={handleEditorImageUpload}
                    />
                  </div>
                  <div>
                    <Label className="text-white/70">Images</Label>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-4">
                        {formData.downsides.images.map((image, index) => (
                          <div key={index} className="relative group">
                            <ImagePreview url={image} />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute -top-2 -right-2 bg-red-500/80 hover:bg-red-500 text-white"
                              onClick={() => handleRemoveImage('downsides', index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                      <ImageUploadButton section="downsides" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Gallery Section */}
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Gallery</CardTitle>
                  <CardDescription className="text-white/50">
                    Add images to your gallery
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-white/70">Images</Label>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-4">
                        {formData.gallery.images.map((image, index) => (
                          <div key={index} className="relative group">
                            <ImagePreview url={image} />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute -top-2 -right-2 bg-red-500/80 hover:bg-red-500 text-white"
                              onClick={() => handleRemoveGalleryImage(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                      <ImageUploadButton section="gallery" />
                    </div>
                  </div>
                  <div>
                    <Label className="text-white/70">Captions</Label>
                    <div className="space-y-2">
                      {formData.gallery.captions.map((caption, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Input
                            value={caption}
                            readOnly
                            className="bg-white/5 border-white/10 text-white"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              const newCaptions = [...formData.gallery.captions];
                              newCaptions[index] = '';
                              setFormData(prev => ({
                                ...prev,
                                gallery: {
                                  ...prev.gallery,
                                  captions: newCaptions
                                }
                              }));
                            }}
                            className="text-white/70 hover:text-white"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <div className="flex items-center space-x-2">
                        <Input
                          placeholder="Add caption"
                          onChange={(e) => {
                            const newCaptions = [...formData.gallery.captions];
                            newCaptions[formData.gallery.images.length - 1] = e.target.value;
                            setFormData(prev => ({
                              ...prev,
                              gallery: {
                                ...prev.gallery,
                                captions: newCaptions
                              }
                            }));
                          }}
                          className="bg-white/5 border-white/10 text-white"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Future Plans Section */}
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Future Plans</CardTitle>
                  <CardDescription className="text-white/50">
                    What are your plans for the future?
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-white/70">Future Plans Description</Label>
                    <RichTextEditor
                      value={formData.future_plans.text}
                      onChange={(value) => handleSectionChange('future_plans', 'text', value)}
                      className="bg-white/5 border-white/10"
                      onImageUpload={handleEditorImageUpload}
                    />
                  </div>
                  <div>
                    <Label className="text-white/70">Images</Label>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-4">
                        {formData.future_plans.images.map((image, index) => (
                          <div key={index} className="relative group">
                            <ImagePreview url={image} />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute -top-2 -right-2 bg-red-500/80 hover:bg-red-500 text-white"
                              onClick={() => handleRemoveImage('future_plans', index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                      <ImageUploadButton section="future_plans" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Conclusion Section */}
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Conclusion</CardTitle>
                  <CardDescription className="text-white/50">
                    What did you learn from your creation?
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-white/70">Conclusion Text</Label>
                    <RichTextEditor
                      value={formData.conclusion.text}
                      onChange={(value) => handleSectionChange('conclusion', 'text', value)}
                      className="bg-white/5 border-white/10"
                      onImageUpload={handleEditorImageUpload}
                    />
                  </div>
                  <div>
                    <Label className="text-white/70">Images</Label>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-4">
                        {formData.conclusion.images.map((image, index) => (
                          <div key={index} className="relative group">
                            <ImagePreview url={image} />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute -top-2 -right-2 bg-red-500/80 hover:bg-red-500 text-white"
                              onClick={() => handleRemoveImage('conclusion', index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                      <ImageUploadButton section="conclusion" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-white/10 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/20"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save Creation"}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContent; 