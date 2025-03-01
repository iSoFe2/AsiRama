import React from "react";
import { Card, CardBody, Button, Progress } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

interface DownloadedItem {
  id: string;
  title: string;
  thumbnail: string;
  progress: number;
  size: string;
  isComplete: boolean;
}

export function DownloadsPage() {
  const [downloads, setDownloads] = React.useState<DownloadedItem[]>([
    {
      id: "1",
      title: "Inception",
      thumbnail: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      progress: 100,
      size: "1.2 GB",
      isComplete: true
    },
    {
      id: "3",
      title: "Interstellar",
      thumbnail: "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
      progress: 65,
      size: "1.8 GB",
      isComplete: false
    },
    {
      id: "4",
      title: "Stranger Things - S01E01",
      thumbnail: "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      progress: 100,
      size: "850 MB",
      isComplete: true
    }
  ]);

  const handleDeleteDownload = (id: string) => {
    setDownloads(downloads.filter(item => item.id !== id));
  };

  const totalStorage = "5.0 GB";
  const usedStorage = "2.9 GB";
  const storagePercentage = 58;

  return (
    <div className="min-h-screen bg-black pb-16 md:pb-0">
      <div className="container mx-auto px-4 py-16 pt-20">
        <h1 className="text-3xl font-bold text-white mb-6">Downloads</h1>
        
        <Card className="bg-gray-900 border-0 mb-6">
          <CardBody>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <h3 className="text-white font-medium">Storage</h3>
                <span className="text-white/70 text-sm">{usedStorage} / {totalStorage}</span>
              </div>
              <Progress 
                value={storagePercentage} 
                color="danger"
                className="h-2"
              />
              <p className="text-white/70 text-sm mt-1">
                {storagePercentage}% of your storage is used
              </p>
            </div>
          </CardBody>
        </Card>
        
        <div className="space-y-4">
          {downloads.length > 0 ? (
            downloads.map((item) => (
              <Card key={item.id} className="bg-gray-900 border-0">
                <CardBody>
                  <div className="flex gap-4">
                    <div className="w-24 h-36 rounded-md overflow-hidden">
                      <img 
                        src={item.thumbnail} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-white font-bold">{item.title}</h3>
                        <p className="text-white/70 text-sm">{item.size}</p>
                        
                        {!item.isComplete && (
                          <div className="mt-2">
                            <Progress 
                              value={item.progress} 
                              color="danger"
                              size="sm"
                              showValueLabel={true}
                              className="max-w-md"
                            />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-2 mt-2">
                        {item.isComplete ? (
                          <Button 
                            as={Link}
                            to={`/watch/${item.id}`}
                            size="sm" 
                            color="danger"
                            startContent={<Icon icon="lucide:play" />}
                          >
                            Play
                          </Button>
                        ) : (
                          <Button 
                            size="sm" 
                            color="default"
                            variant="bordered"
                            startContent={<Icon icon="lucide:pause" />}
                          >
                            Pause
                          </Button>
                        )}
                        
                        <Button 
                          size="sm" 
                          color="default"
                          variant="light"
                          isIconOnly
                          onClick={() => handleDeleteDownload(item.id)}
                        >
                          <Icon icon="lucide:trash" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-16">
              <Icon icon="lucide:download" className="text-white/50 text-5xl mb-4" />
              <p className="text-white text-xl">No downloads yet</p>
              <p className="text-white/70 mt-2">Your downloaded content will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}