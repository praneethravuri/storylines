import { Request, Response, NextFunction } from "express";

interface VersionRequest extends Request {
    apiVersion?: string;
}

export const apiVersionMiddleware = (req: VersionRequest, res: Response, next: NextFunction) => {
    // Example API call: http://localhost:5000/api/v1/stories
    const version = req.path.split('/')[2];
    if (version && version.startsWith('v')) {
        req.apiVersion = version
    } else {
        req.apiVersion = 'v1'
    }
    next();
}