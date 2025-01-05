import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { PlusCircle, Lightbulb, Clock, Mail, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

interface GeneratedIdea {
  id: string;
  title: string;
  description: string;
  created_at: string;
  tech_stack: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [ideas, setIdeas] = useState<GeneratedIdea[]>([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string>("");
  const isMobile = useIsMobile();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/sign-in');
        return;
      }
      setUserEmail(session.user.email || "");
    };

    const fetchIdeas = async () => {
      try {
        const { data, error } = await supabase
          .from('generated_ideas')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setIdeas(data || []);
      } catch (error) {
        console.error('Error fetching ideas:', error);
        toast({
          title: "Error loading ideas",
          description: "Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
    fetchIdeas();
  }, [navigate, toast]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20 p-4 md:p-8">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20 p-4 md:p-8">
      <div className="container max-w-6xl mx-auto space-y-6 md:space-y-8">
        <Card className="bg-white/50 backdrop-blur-sm border-none shadow-lg">
          <CardContent className="flex flex-col md:flex-row md:items-center md:justify-between p-4 md:p-6 space-y-4 md:space-y-0">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="p-2 md:p-3 bg-primary rounded-full">
                <User className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg md:text-xl font-semibold">Welcome back!</h2>
                <div className="flex items-center text-xs md:text-sm text-muted-foreground">
                  <Mail className="w-3 h-3 md:w-4 md:h-4 mr-2 shrink-0" />
                  <span className="truncate max-w-[200px] md:max-w-[300px]">{userEmail}</span>
                </div>
              </div>
            </div>
            <Button 
              onClick={() => navigate('/generator')} 
              className="w-full md:w-auto bg-primary text-white hover:bg-primary/90"
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              Generate New Idea
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-4 md:space-y-6">
          <h1 className="text-2xl md:text-3xl font-bold">Your Generated Ideas</h1>
          
          {ideas.length === 0 ? (
            <Card className="text-center p-6 md:p-8 bg-white/50 backdrop-blur-sm border-none shadow-lg">
              <CardContent className="space-y-4">
                <Lightbulb className="w-10 h-10 md:w-12 md:h-12 mx-auto text-primary" />
                <h2 className="text-lg md:text-xl font-semibold">No Ideas Generated Yet</h2>
                <p className="text-sm md:text-base text-muted-foreground">
                  Start by generating your first website idea!
                </p>
                <Button 
                  onClick={() => navigate('/generator')}
                  className="w-full md:w-auto bg-primary text-white hover:bg-primary/90"
                >
                  Generate Your First Idea
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:gap-6 md:grid-cols-2">
              {ideas.map((idea) => (
                <Card key={idea.id} className="hover:shadow-lg transition-shadow bg-white/50 backdrop-blur-sm border-none">
                  <CardHeader className="p-4 md:p-6">
                    <CardTitle className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 md:gap-4">
                      <span className="text-lg md:text-xl">{idea.title}</span>
                      <div className="flex items-center text-xs md:text-sm text-muted-foreground whitespace-nowrap">
                        <Clock className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                        {formatDate(idea.created_at)}
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6 pt-0 space-y-3 md:space-y-4">
                    <p className="text-sm md:text-base text-muted-foreground line-clamp-3">
                      {idea.description}
                    </p>
                    {idea.tech_stack && (
                      <div className="text-xs md:text-sm">
                        <span className="font-semibold">Tech Stack:</span>{' '}
                        <span className="text-muted-foreground">{idea.tech_stack}</span>
                      </div>
                    )}
                    <Button 
                      variant="outline" 
                      onClick={() => navigate('/generated-idea', { state: { generatedIdea: idea } })}
                      className="w-full md:w-auto hover:bg-primary hover:text-white"
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;